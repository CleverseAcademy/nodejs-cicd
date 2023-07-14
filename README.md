# nodejs-cicd

Example repo Node.js CI/CD with GitHub Actions

## CI/CD goals

The goals are incremental:

1. Build and test Node.js app code after pushes

2. Build Docker image and publish to DockerHub after new tag pushes

3. (TODO) Deploy to servers or clusters

## GitHub Actions secrets setup

Add secrets to this repository before using GitHub Actions workflows.

The 2 secrets required to push Docker images to [Docker Hub](https://hub.docker.com) is:

- `DOCKERHUB_USERNAME` - your username on Docker Hub

- `DOCKERHUB_TOKEN` - your Docker Hub access token

These will be used by workflow [docker.yaml](./.github/workflows/docker.yaml)
to authenticate when pushing to Docker Hub.

## Example app

The example web app needs to connect to a MongoDB instance.

The repo provides a [Dockerfile] and a [`docker-compose.yaml`](./deploy/docker-compose.yaml) to
help you understand how the app works:

```shell
# Interactive run
docker compose -f ./deploy/docker-compose.yaml up;

# Detached run
docker compose -f ./deploy/docker-compose.yaml up -d;

# Stop
docker compose -f ./deploy/docker-compose.yaml down;
```
