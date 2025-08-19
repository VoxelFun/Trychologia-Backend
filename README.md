### Prepare
- npm install
- install mariadb (brew services start mariadb)
- create an user in db
```
create user "node"@"localhost" identified by "node";
grant all privileges on *.* to "node"@"localhost";
```
- copy .env.sample
- run create.sql
- run dummy_data.sql
