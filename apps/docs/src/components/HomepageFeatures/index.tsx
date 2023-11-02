import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Public Chat Bot',
    Svg: require('@site/static/img/public.svg').default,
    description: (
      <>
        It is a public chat bot help citizens to get information about the
        government
      </>
    ),
  },
  {
    title: 'Government Data',
    Svg: require('@site/static/img/data.svg').default,
    description: (
      <>
        The chat bot is powered by the government data and it is updated
        regularly to ensure the accuracy of the information
      </>
    ),
  },
  {
    title: 'Large Language Model',
    Svg: require('@site/static/img/robot.svg').default,
    description: (
      <>
        A large language model is used to ensure the chat bot can understand the
        user's intent and provide the correct information
      </>
    ),
  },
];

function Feature({ title, Svg, description }: Readonly<FeatureItem>) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
