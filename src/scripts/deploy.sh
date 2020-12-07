myob-auth k -e europa-preprod
kubectl delete -f ./scripts/gitmetrics-bff.yaml -n training

kubectl apply -f ./scripts/gitmetrics-bff.yaml -n training
