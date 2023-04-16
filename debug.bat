@echo off

docker "build" "-t" "ragemp-server" "." "--no-cache"
docker "stop" "ragemp_server"
docker "rm" "ragemp_server"
docker run -d --name ragemp_server -p 22005:22005/udp -p 22006:22006 --hostname ragemp_server --env-file env.list -it ragemp-server
docker "logs" "-f" "ragemp_server"