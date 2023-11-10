# Fullstack Application Django/React

## Installation method

1. Clone this Repo

   `git clone https://github.com/Cyrano71/TestBureauxLocaux.git`
   
2. deploy the backend by using the docker command :

   `docker compose up`
   
It will deploy a postgres database and a django rest api server.
For the django we use the following packages :
- psycopg2
- django-cors-headers
- djangorestframework-simplejwt

The docker deployment will automatically populate the input data into the database (see [this sample](mysite/api/fixtures/sample.json) )
and will automatically create two users:
- one admin user with username = "admin", password = "1234"
- one normal user with  username = "jehan", password = "1234"

3. cd into the react app folder

   `cd my-react-app`

4. install the dependencies

   `npm install`
   
We use as dependencies:
- react-router

4. Start the app

   `npm run start`

5. Use the application on http://localhost:3000/

When you will first use the application you will need to log into the backend

![alt text](assets/homepage_login.PNG)

Then you will have a log in form automatically populated with the credential of the user jehan

![alt text](assets/loginform.PNG)

As soon as the authentication is done with the backend you will receive an authentication token
that will be stored in the local storage of your browser:

![alt text](assets/localstorage.PNG)

With this token you will have access to the list of real estate items in the postgres database:

![alt text](assets/realestate_page.PNG)

If you click on the title of the item you will have access to the details of the item:

![alt text](assets/realestatedetail_page.PNG)

You can update the item by clicking on the button and you will be redirected to the update form
automatically populated with the data of the item:

![alt text](assets/updateform_page.PNG)

In the the list of real estate items you have a button to create a new item:

![alt text](assets/realestate_page.PNG)

It will redirect you to the add page:

![alt text](assets/createform_page.PNG)

6. For the css I would like to thank mattc0m
You can find his work on this link : https://codepen.io/mattc0m/pen/rNdMjKX