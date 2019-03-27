# cinefile
      
    Initial installs: 
      --> First you need to install node, nodemon and MongoDB in your system.
      --> cd /path_to_index.js
      --> sudo npm i (to install the npm packages included in package.json)
      --> export jwtPrivateKey=a_string_of_your_choice(for linux users. For windows users replace export with
      set. We do this in order to set the key that we are going to use for the encryption of the token used in authentication
      and authorization)
      --> (in an new terminal...) sudo mongod (only for linux users..windows users can skip this step because the mongo
      daemon runs automatically)
      --> nodemon (the app listens to port 3000)

    Endpoints:
      -->genres:
        GET  api/genres --> get all genres
        POST api/genres --> create a genre. The body of the genre is name.
        PUT  api/genres/'id' --> update all the fields of a genre
        DELETE api/genres/'id' --> delete a genre
        GET api/genres/'id'--> get information for a certain genre
      -->movies:
        GET  api/movies --> get all movies
        POST api/movies --> create a movie. The body of the movie is title,genre,numberInStock and dailyRentalRate
        PUT  api/movies/'id' --> update all the fields of a movie
        DELETE api/movies/'id' --> delete a movie
        GET api/movies/'id'--> get information for a certain movie
      -->rentals:
        GET  api/rentals --> get all rentals
        POST api/rentals --> create a rental. The body of the rental is customer and movie
        PUT  api/rentals/'id' --> update all the fields of a rental
        DELETE api/rentals/'id' --> delete a rental
        GET api/rentals/'id'--> get information for a certain rental
     -->customers:
        GET  api/customers --> get all customers
        POST api/customers --> create a customer. The body of the customers is name,isGold and phone
        PUT  api/customers/'id' --> update all the fields of a customer
        DELETE api/customers/'id' --> delete a customer
        GET api/customers/'id'--> get information for a certain customer
     -->users:
        GET api/me --> A user can see his information.
        POST api/users --> a user registers. The body of the register is name ,password and email.
     -->auth:
        POST api/auth --> a user logins. The body of the login is email and password.
