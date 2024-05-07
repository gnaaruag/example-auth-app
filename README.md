### starter auth app

this is a basic session based authentication app, this is to be cloned and used to build an application on top of it

to use run this on a bash terminal in your project folder
```
git clone https://github.com/gnaaruag/example-auth-app.git server_tmp && mkdir -p server && mv server_tmp/server/* server/ && rm -rf server_tmp
```
this creates a server, which will also function as your express server

then run
```
npm install
```

after this you can build a node express application on top
