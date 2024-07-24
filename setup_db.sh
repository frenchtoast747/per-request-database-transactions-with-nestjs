#!/bin/bash
yes=""
while getopts :y flag
do
    case "${flag}" in
        y) yes=1;;
        *)
    esac
done

if [ -z "${yes}" ];
then
    read -p "Are you sure? I'm about to drop the existing database. Type Y or y: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        yes=1
    fi
fi

NAME="todo"

if [ -n "${yes}" ]; then
    psql -h localhost -Upostgres -c "DROP DATABASE IF EXISTS $NAME"
    psql -h localhost -Upostgres -c "CREATE DATABASE $NAME"
    psql -h localhost -Upostgres -c "CREATE USER $NAME WITH PASSWORD '$NAME'" || echo "...skipping."
    psql -h localhost -Upostgres -c "GRANT ALL PRIVILEGES ON DATABASE $NAME to $NAME"
fi
