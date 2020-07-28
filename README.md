# Bookworm
Craig Cockrum - Css
Eric Hagood - Backend
Shirley Kaffrey

# About
BOOKworm is app that utilizes the Google Books API to allows users to organize their favorite reading material.  Users can serach for books, add them to their collection and create a favorites list.  
# Site Link
https://mighty-meadow-95753.herokuapp.com/
# Technologies Used
This project was created using React for the front end web page and, express, mongoose, and cors for development of the backend database. We also used the Google Books API.
# Approach Taken
The approach taken from the backend was to quickly set up the database with all of the necessary routes and whitelists and then begin using curl requests to test that data could be added, sent, updated, and deleted.  For the front end API call to Google Books, we take in a search parameter for the book title and send a request to the api, then we take the returned data and display it on the page for the user to view so they can choose which book to add to their collection.
# Unsolved problems
One unsolved problem is user authentication.

#Deployed Repos
We had to create new repositories for front and back end in order to deploy them to heroku, so here is the link to those repositories:
https://github.com/EricHagood/bookworm_client
https://github.com/EricHagood/Bookworm_API
