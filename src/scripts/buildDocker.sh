myob-auth l

aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 599331037720.dkr.ecr.ap-southeast-2.amazonaws.com
docker build -t lttmetric-bff .
docker tag lttmetric-bff:latest 599331037720.dkr.ecr.ap-southeast-2.amazonaws.com/lttmetric-bff:latest
docker push 599331037720.dkr.ecr.ap-southeast-2.amazonaws.com/lttmetric-bff:latest
