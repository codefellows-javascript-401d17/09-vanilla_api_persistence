Vanilla REST API wth file system persistance :D

This API is seperated into 6 major components:

1.) The server

2.) lib driectory

3.) model directory

4.) test directory

5.) data directory

6.) node_modules

-----Component Overview-----

1. The server. This is the meat and potatoes of it all. It uses the http module to host a server. It requires various modules for establishing routes, endponts and file scaffolding.

2. lib directory houses all of our home made modules and other goodies.

3. model directory houses all object constructors.

4. test directory houses all of our tests >:(

5. data driectory is used for file system persistent storage. It has a sub-directory for each model.

6. node_modules houses all of our dependancies

----Instructions----

Using httpie is probably the easiest way to go about this whole process.

-Start off by running the server. Make sure you're in the lab directory and type the following :

node server.js

This should return a prompt telling you the sever is up. Also, if you don't have a data folder, it'll create one automatically for you and fill it with folders for each model.

-Open another terminal tab.

*To do a GET request type the following:
http GET :3000/api/(whatever model you pick) id==324235345234

this should return an object

*To do a POST request, it's a bit harder. We have to know what our model looks like. We'll have to include more parameters in the request like this:

http POST :3000/api/dog name==rover breed==pug age==7

This should return an object that looks like this:

{
  name: 'rover',
  breed: 'pug',
  age: '7'
}

*To do a DELETE request, it's identical to the GET request. Except it shouldn't return anything. It'll look like this:

http DELETE :3000/api/car id==324235345234

All done!