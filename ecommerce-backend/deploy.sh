#!/usr/bin/env bash
set -euo pipefail

AWS_REGION="${AWS_REGION:-us-east-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-<your_aws_account_id>}"
ECR_REPO="${ECR_REPO:-ecommerce-backend}"
IMAGE_TAG="${IMAGE_TAG:-latest}"

ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"

echo "Building docker image..."
docker build -t ${ECR_REPO}:${IMAGE_TAG} .

echo "Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo "Creating ECR repo if not exists..."
aws ecr describe-repositories --repository-names "${ECR_REPO}" --region ${AWS_REGION} >/dev/null 2>&1 || aws ecr create-repository --repository-name "${ECR_REPO}" --region ${AWS_REGION}

echo "Tagging and pushing image..."
docker tag ${ECR_REPO}:${IMAGE_TAG} ${ECR_URI}:${IMAGE_TAG}
docker push ${ECR_URI}:${IMAGE_TAG}

echo "Done: pushed ${ECR_URI}:${IMAGE_TAG}"
