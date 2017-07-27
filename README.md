#Overview

* This RESTful API provides the back-end infrastructure and funtionality to create, read, update, and delete data relative to superheroes.

#Architecture

<p>This API is structured on a Model View Controller(MVC) architectue pattern.  The basic technologies are: node.js server, node.http module, our own "express like" middleware.</p>

<p>Middleware:</p>

* We wrote a vanilla version of our own router that handles the base routing.

* We wrote a vanilla version of a body-parser module that parses JSON data.

#API endpoints

##POST /api/superhero

<p>Required Data:</p>

* Provide superhero name, the comic universe where they are from as JSON.

<p>This route will create a new superhero by providing a superhero name and a comic book universe from which they reside in the body of the request.</p>

##GET /api/superhero

<p>Required Data:</p>

* Provide a specific unique superhero id.

<p>This route will require a unique superhero id and grab the specific JSON object associated with that id.</p>

#Testing

* Testing Framework mocha test runner
* chai(expect)
* bluebird promise library
* eslint
