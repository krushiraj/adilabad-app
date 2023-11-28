#!/bin/bash
set -e

start() {
  echo "---- BUILDING CONTAINER"
  docker-compose build

  echo
  echo "---- STARTING CONTAINERS"
  docker-compose up -d mongo

  echo
  echo "---- SETTING UP MONGO REPLICASET"
  docker exec -it docker_mongo_1 mongo --eval "printjson(rs.initiate({ _id: \"rs0\", members: [ { _id: 0, host: \"mongo:27017\"} ] }))"
  
  echo
  echo "---- DONE, STATUS:"
  docker-compose ps
}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )"
pushd $DIR &>/dev/null
case $1 in
  start)
    start
    ;;

  stop)
    docker-compose down
    ;;

  logs)
    docker-compose logs -f $2
    ;;

  *)
    echo 'Usage: ./docker.sh start|stop|logs';
    echo
    echo "---- STATUS:"
    docker-compose ps
    ;;
esac