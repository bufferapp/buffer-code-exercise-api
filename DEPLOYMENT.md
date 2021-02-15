# How to deploy this service

## Docker Image

Build the new Docker image. Check for previous version numbers [on Docker Hub here](https://hub.docker.com/repository/docker/bufferapp/buffer-code-exercise-api).

```
docker build -t bufferapp/buffer-code-exercise-api:<YOUR-NEW-VERSION> .
```

Verify the Docker image runs correctly:

```
docker run --rm -p 8888:8888 bufferapp/buffer-code-exercise-api:<YOUR-NEW-VERSION>
```
```
curl http://localhost:8888
{
  "status": "awesome"
}
```

Push the image to Docker hub

```
docker push buffer-code-exercise-api:<YOUR-NEW-VERSION>
```

## Kubernetes Deployemnt

Update the `kubernetes.yaml` file with your new image version and apply the changes (create if the service has been previously deleted).

```
kubectl apply -f kubernetes-deployment.yaml
```

Monitor your rollout:

```
kubectl -n internal get pods -l app=buffer-code-exercise-api
```

## Kubernetes Service

If a change is required to the Kubernetes service, first get the AWS SSL cert ARN from the AWS dashboard, then apply the changes:

```
kubectl apply -f kubernetes-service.yaml
```
