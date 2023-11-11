import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import * as digitalocean from '@pulumi/digitalocean';

// Get config
const awsConfig = new pulumi.Config('aws');
const awsRegion = awsConfig.get('region');

// Create VPC
const vpc = new aws.ec2.Vpc('hutech-vpc', {
  cidrBlock: process.env.AWS_VPC_IP,
  enableDnsHostnames: true,
  enableDnsSupport: true,
});

const subnet = new aws.ec2.Subnet('hutech-subnet', {
  cidrBlock: process.env.AWS_VPC_SUBNET,
  availabilityZone: awsRegion,
  vpcId: vpc.id,
  mapPublicIpOnLaunch: true,
});

// Create IAM role
const ecsExecutionRole = new aws.iam.Role('ecsExecutionRole', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: 'ecs-tasks.amazonaws.com',
        },
      },
    ],
  }),
});

// Create ECR repository
const repo = new awsx.ecr.Repository('government-ecr', {
  forceDelete: true,
  imageScanningConfiguration: {
    scanOnPush: true,
  },
});

const image = new awsx.ecr.Image('government-img', {
  repositoryUrl: repo.url,
  path: '../api',
});

// Create load balancer
const lb = new digitalocean.LoadBalancer('lb', {
  region: digitalocean.Region.NYC1,
  forwardingRules: [
    {
      entryPort: 80,
      entryProtocol: digitalocean.Protocol.HTTPS,
      targetPort: 80,
      targetProtocol: digitalocean.Protocol.HTTPS,
    },
  ],
  healthcheck: {
    port: 80,
    protocol: digitalocean.Protocol.HTTPS,
    path: '/',
  },
  dropletTag: new digitalocean.Tag('lb').name,
});

// Create cloudwatch log group
const logGroup = new aws.cloudwatch.LogGroup('government-log-group', {
  name: 'government-log-group',
});

// Create ECS cluster
const cluster = new aws.ecs.Cluster('government-cluster', {
  name: 'government-cluster',
  capacityProviders: ['FARGATE'],
  defaultCapacityProviderStrategies: [
    {
      capacityProvider: 'FARGATE',
      weight: 1,
    },
  ],
  settings: [
    {
      name: 'containerInsights',
      value: 'enabled',
    },
  ],
  tags: {
    Name: 'government-cluster',
  },
});

const taskDefinition = new aws.ecs.TaskDefinition('government-api-task', {
  family: 'government-api-task',
  requiresCompatibilities: ['FARGATE'],
  networkMode: 'awsvpc',
  taskRoleArn: ecsExecutionRole.arn,
  executionRoleArn: ecsExecutionRole.arn,
  containerDefinitions: pulumi.jsonStringify([
    {
      name: 'government-container',
      image: image.imageUri,
      cpu: 256,
      memory: 256,
      essential: true,
      portMappings: [
        {
          containerPort: 80,
          hostPort: 80,
        },
      ],
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': logGroup.name,
          'awslogs-region': awsRegion,
          'awslogs-stream-prefixs': logGroup.namePrefix,
        },
      },
    },
  ]),
});

const service = new awsx.ecs.FargateService('government-service', {
  cluster: cluster.arn,
  assignPublicIp: true,
  networkConfiguration: {
    subnets: [subnet.id],
    securityGroups: [vpc.defaultSecurityGroupId],
  },
  taskDefinition: taskDefinition.arn,
});

// Create Route53 record
const zone = new aws.route53.Zone('government-zone', {
  name: process.env.AWS_ROUTE53_DOMAIN,
});

const lbRecord = new aws.route53.Record('government-lb-record', {
  name: process.env.AWS_ROUTE53_SUBDOMAIN,
  zoneId: zone.zoneId,
  type: 'A',
  ttl: 300,
  records: [lb.ip],
});

// Create WebACL WAF
const webAcl = new aws.wafv2.WebAcl('government-web-acl', {
  defaultAction: {
    allow: {},
  },
  name: 'government-web-acl',
  description: 'WebACL for government application',
  rules: [
    {
      name: 'block-ip-rule',
      priority: 1,
      statement: {
        managedRuleGroupStatement: {
          name: 'AWSManagedRulesCommonRuleSet',
          vendorName: 'AWS',
        },
      },
      action: {
        block: {},
      },
      overrideAction: {
        none: {},
      },
      visibilityConfig: {
        cloudwatchMetricsEnabled: true,
        metricName: 'block-ip-rule',
        sampledRequestsEnabled: true,
      },
    },
  ],
  scope: 'REGIONAL',
  visibilityConfig: {
    cloudwatchMetricsEnabled: true,
    metricName: 'block-ip-rule',
    sampledRequestsEnabled: true,
  },
});

export const webAclId = webAcl.id;
export const webAclArn = webAcl.arn;
export const serviceName = service.service.name;
export const url = pulumi.interpolate`https://${lbRecord.name}.${zone.name}`;
