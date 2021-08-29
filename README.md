# angular_postgres

Running postgresql in docker container
-------
- `docker container ls` ( -a - include stopped containers )
- `docker container run -d --name=pg -p 5431:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=/pgdata -v` _(copy the path to the created pgdata folder, which lies in the project)_ `:/pgdata postgres` (-p <host machine free port>:<container port>)
pgdata folder contains postgres files
- `psql -h localhost -p 5431 -U postgres` (password would be 'secret', note the port 5431, not 5432)
- `update config to contain 5431 port`
- `npm run db:create` create a database inside container 
- `nmp run db:migrate` create tables inside container
- `docker container stop pg` stops postgres
- `docker container start pg` starts pg (note that the data still exists)
  
  

