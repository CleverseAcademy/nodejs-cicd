# nodejs-cicd

Example repo Node.js CI/CD with GitHub Actions

The example web app needs to connect to a MongoDB instance.

The repo provides a [Dockerfile] and a [`docker-compose.yaml`](./deploy/docker-compose.yaml) to
help you understand how the app works:

```shell
# Interactive run
docker compose -f ./deploy/docker-compose.yaml up;

# Detached run
docker compose -f ./deploy/docker-compose.yaml up -d;
```

## CI/CD goals

The goals are incremental:

1. Build and test Node.js app code after pushes

2. Build Docker image and publish to DockerHub after new tag pushes

3. (TODO) Deploy to servers or clusters
