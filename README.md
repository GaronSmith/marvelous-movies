# Marvelous Movies
## What is it? 
### Marvelous Movies is a clone of GoodReads with a movie twist. The application will allow you to sign up/login, see your friends activities, rate/review movies, add movies to your blockbuster shelf, browse films by genre(sorted by rating), and generate a random movie to put on your watch list!!
***
## Developing
### To run this application locally, you'll need to:

* git clone this repo
* cd into the local repo
* npm install to install the dependencies
* Create a .env file based on the .env.example file included in the repo with your own values
* Create a user on your local machine with the username and password specified in your .env file in PostgreSQL
* Run npx dotenv sequelize db:create to create the database
** If the sequelize module is not found, try running npx dotenv sequelize-cli db:create and replace sequelize with sequelize-cli for the rest of these commands
* Run npx dotenv sequelize db:migrate to run the migrations
* Run npx dotenv sequelize db:seed:all to seed the database
* Finally, start the development server with npm start. The scripts in the package.json should do the work. You'll see the local address you can use show up in the terminal.
*** 
## Click the live link!
* https://marvelous-movies.herokuapp.com/
## Check out our Wiki Docs
* https://github.com/GaronSmith/marvelous-movies/wiki
***
## Technologies Used
* Pug.js
* AJAX
* CSS
* JavaScript
* Sequelize
* PostgreSQL
* Express
* Node.js
* Bcryptjs
***
## Some of the impressive features!
* Users are able to:
** create an account
** View top movies
** Rate/Review movies
** follow and unfollow friends
** Add movies to a watch list to share with your friends
** See what your friends are wanting to watch on your user feed
** View movies based on recent reviews and the top ratings
** Search for movies by title


## Some of the challenges that we face(&how we solved them!):
*
*
*

## Code snippets of some of our features
### What the feature does
* screenshot of code
* screenshot of application
### What the feature does
* screenshot of code
* screenshot of application
### What the feature does
* screenshot of code
* screenshot of application
