YelpDoggo is a site where you can rent a doggo for a few hours and spend some quality time.

This is a fullstack application built in the context of the Web Developer Bootcamp course by Colt Steele on Udemy. 
Bootstrap + EJS frontend
NodeJS backend 
MongoDB database.

# Prerequisites

 * npm 
 * mongodb
 
# To Run
* npm install & npm start

# RESTFUL ROUTES

name      url                                     verb    desc
======================================================================================
INDEX     /doggos                                 GET     Display a list of all doggos
NEW       /doggo/new                              GET     Displays form to make a create a new doggo
CREATE    /doggo                                  POST    Creates a new doggo
SHOW      /doggo/:id                              GET     Shows more detail on said doggo
EDIT      /doggo/:id/edit                         GET     Shows form to edit current doggo
UPDATE    /doggo/:id                              PUT     Updates selected doggo
DESTROY   /doggo/:id                              DELETE  Deletes selected doggo

NEW       /doggo/:id/comments/new                 GET     Displays form to make a create a new comment
CREATE    /doggo/:id/comments                     POST    Creates a new comment
EDIT      /doggo/:id/comments/:comment_id/edit    GET     Shows form to create new comment
UPDATE    /doggo/:id/comments/:comment_id         PUT     Updates selected comment
DESTROY   /doggo/:id/comments/:comment_id         DELETE  Deletes selected comment 

