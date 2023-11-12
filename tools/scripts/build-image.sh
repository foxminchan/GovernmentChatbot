#!/bin/bash

REGISTRY=ghcr.io/foxminchan

echo $REGISTRY

echo "Step 1: Building images..."

echo "Ready for building api image"

docker build -f apps/api/Dockerfile . --tag $REGISTRY/government-chatbot-api:latest

echo "Ready for building website image"

docker build -f apps/website/Dockerfile . --tag $REGISTRY/government-chatbot-website:latest

echo "Step 2: Pushing images..."

echo "Ready for pushing api image"

docker push $REGISTRY/government-chatbot-api:latest

echo "Ready for pushing website image"

docker push $REGISTRY/government-chatbot-website:latest