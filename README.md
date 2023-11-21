# Fullstack Application Django/React

## Installation method

1. On Ec2 instances : 

```
sudo su
yum update -y
amazon-linux-extras install docker -y
service docker start
usermod -a -G docker ec2-user
chkconfig docker on

yum install -y git
mkdir -p /usr/local/lib/docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

2. Clone this Repo

   `git clone https://github.com/Cyrano71/TestBureauxLocaux.git`

3. cd into the TestBureauxLocaux folder:

   `cd TestBureauxLocaux`

4. deploy the backend by using the docker command :

   `docker compose up`
   
---
**NOTE**

I am using `docker compose` (with a SPACE) and not `docker-compose` (with a DASH)
To understand the difference :
https://stackoverflow.com/questions/66514436/difference-between-docker-compose-and-docker-compose

If you are using `docker-compose up` (with a DASH) you will have this errors:
```
ERROR: The Compose file './docker-compose.yml' is invalid because:
services.mydjangobackend.depends_on contains an invalid type, it should be an array
```

To use `docker compose` (with a SPACE) on your linux machine you need to install the docker compose plugin:

https://stackoverflow.com/questions/72187612/installing-docker-compose-plugin-on-amazon-linux-2
---


The docker will deploy a postgres database and a django rest api server.
For the django we use the following packages :
- psycopg2
- django-cors-headers
- djangorestframework-simplejwt

The docker deployment will automatically populate the input data into the database (see [this sample](backend/api/fixtures/sample.json) )
and will automatically create two users:
- one admin user with username = "admin", password = "1234"
- one normal user with  username = "jehan", password = "1234"

5. in a new terminal, cd into the frontend react app folder

   `cd frontend`

6. install the dependencies

   `npm install`
   
We use as dependencies:
- react-router

7. Start the frontend app

   `npm run start`

## Use the application

The url is : http://localhost:3000/

1. When you will first use the application you will need to log into the backend

![alt text](assets/homepage_login.PNG)

2. Then you will have a log in form automatically populated with the credential of the user jehan

![alt text](assets/loginform.PNG)

3. As soon as the authentication is done with the backend you will receive an authentication token
that will be stored in the local storage of your browser:

![alt text](assets/localstorage.PNG)

4. If you try to skip the authentification step you will receive an Unauthorized response from the backend:

![alt text](assets/unauthorized.PNG)

5. With this token you will have access to the list of real estate items in the postgres database. You have also a search bar that will filter the description :

![alt text](assets/realestate_page.PNG)

6. If you click on the title of the item you will have access to the details of the item:

![alt text](assets/realestatedetail_page.PNG)

7. You can update the item by clicking on the button and you will be redirected to the update form
automatically populated with the data of the item. 

For the Transaction type you will have only theses choices:
- rental or sale

For the Realty type  you will have only theses choices:
- office, land plot, warehouse, retail or coworking

![alt text](assets/updateform_page.PNG)

8. In the the list of real estate items you have a button to create a new item:

![alt text](assets/realestate_page.PNG)

9. It will redirect you to the add page:

![alt text](assets/createform_page.PNG)

## UniTests

### Backend Django unitests

1. You cd into the backend folder:

 `cd backend`

2. You provide the credentials of your dev database in the env file :

   ```
   DEV_DB_ENGINE= django.db.backends.mysql
   DEV_DB_HOST=localhost
   DEV_DB_NAME=
   DEV_DB_PORT=3306
   DEV_DB_USER=
   DEV_DB_PASSWORD=
   ```

   [env file](backend/backend/.env)

3. You also need to install in your conda env the requirements:

 ```
 conda create --name mytestenv
 conda activate mytestenv
 pip3 install -r requirements.txt
 ```

4. You run the tests with this command :

 `python manage.py test`

You can find the code of the tests here : [tests code](backend/api/tests.py)

### Frontend React unitests

1. you cd into the frontend folder:

 `cd frontend`

2. you run the tests with commands :

 `npm test`

You can find the code of the tests here : 

[Items tests file](frontend/src/pages/Items.test.js)

[App test file](frontend/src/App.test.js)

## References

For the css I would like to thank mattc0m
You can find his work on this link : https://codepen.io/mattc0m/pen/rNdMjKX