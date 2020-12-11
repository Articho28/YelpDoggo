RESTFUL ROUTES

name    url                verb    desc
============================================
INDEX   /doggos        GET     Display a list of all doggos
NEW     /doggo/new   GET     Displays form to make a new campground
CREATE  /doggo       POST    Creates a new campground
SHOW    /doggo/:id   GET     Shows more detail on said campground

NEW     campground/:id/comments/new      GET
CREATE  campground/:id/comments          POST

============

THIS IS V5

We are working on styling comments.

==============

THIS IS V6

We are working on Auth
Pt. 1 - Add User Model
Pt. 2 - Register
Pt. 3 - Login
Pt. 4 - Logout logic, navbar, limit exposure to comments if not logged in
Pt. 5 - Display NavBar Links correctly

============ 

THIS IS V7

## Refactor The Routes
We are refactoring our routes into separate files

============ 

THIS IS V8

## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

============ 

THIS IS V9

## Users + doggo
* Prevent unauthorized user from creating a campground
* Save username+id to newly creatd campground

============

THIS IS V10

# Editing doggo
* Add Method-Override (for put requests)
* Add Edit Route for doggo
* Add Link to Edit Page
* Add Update Route

# Deleting doggo
* Add Destroy Route
* Add Delete Button

# Authorization Part 1: doggo
* User can only edit his/her doggo
* User can only delete his/her doggo
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit Button
* Add Update route

# Deleting Comments
* Add Destroy route
* Add Delete button

# Authoriaztion Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash
* Install adn configure connect-flash
* Add bootstrap alerts to header 

# v14
* Dynamic Price Feature





