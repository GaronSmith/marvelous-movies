# Marvelous Movies
## What is it? 
### Marvelous Movies is a clone of GoodReads with a movie twist. The application will allow you to sign up/login, see your friends activities, rate/review movies, add movies to your blockbuster shelf, browse films by genre(sorted by rating), and generate a random movie to put on your watch list!!
***
## Developing
### To run this application locally, you'll need to:
* Get a free API Key at [The Movie Database](https://www.themoviedb.org/)

* Clone the repo
   ```sh
   git clone https://github.com/GaronSmith/marvelous-movies
   ```

* cd into the local repo
   ```sh
    cd marvelous-movies
    ```
* Install NPM packages
   ```sh
   npm install
   ```
* Create a .env file based on the .env.example file included in the repo with your own values

* Create a user on your local machine with the username and password specified in your .env file in PostgreSQL


* Create the database
  ```sh
    npx dotenv sequelize db:create
    ```
 * If the sequelize module is not found, try running ``npx dotenv sequelize-cli db:create`` and replace sequelize with sequelize-cli for the rest of these commands
* Run the migrations
  ```
  npx dotenv sequelize db:migrate
  ```
* Seed the database
  ```
  npx dotenv sequelize db:seed:all
  ```
* Finally, start the development server with `npm start`. The scripts in the package.json should do the work. You'll see the local address you can use show up in the terminal.
*** 
## Click the live link!
  [Marvelous Movies](https://marvelous-movies.herokuapp.com/)
## Check out our Wiki Docs
[Wiki Docs](https://github.com/GaronSmith/marvelous-movies/wiki)
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
* create an account
* View top movies
* Rate/Review movies
* follow and unfollow friends
* Add movies to a watch list to share with your friends
* See what your friends are wanting to watch on your user feed
* View movies based on recent reviews and the top ratings
* Search for movies by title

![search](https://user-images.githubusercontent.com/67882384/104206244-48e91c00-53fd-11eb-8b5a-76ca3be32223.gif)




## Some of the challenges that we face(&how we solved them!):
*
*
*

## Code snippets of some of our features
### feed/content route to retrieve the recent shelf updates of users that you follow

```
router.get('/content', asyncHandler(async (req, res, next) => {
    let user = await db.User.findByPk(req.session.auth.userId,{
        include:{
            model: db.User,
            as: 'Followers',
            include:{
                model: db.BlockbusterShelf,
                include:{
                    model: db.Movie,
                }
            }
        }
    })
 
    let arrayUpdates = new Array();
   
    arrayUpdates.sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt) )
    
    user.Followers.forEach(item => {
        item.BlockbusterShelves.forEach(statusUpdate => {
            statusUpdate.setDataValue('userName', item.firstName)
            arrayUpdates = arrayUpdates.concat(statusUpdate)
        })
    })
    arrayUpdates.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    

    res.json(arrayUpdates)
}))
```


### What the feature does
* screenshot of code
* screenshot of application
### What the feature does
* screenshot of code
* screenshot of application
