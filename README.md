# Bloglist-app
A small blog listing app made for the Full Stack Open 2020 course. Stack is MERN (MongoDB, Express, React, Node)<br>
The backend is at the root, and React frontend in the bloglist-frontend folder.

## Features
* View a list of all blogs sorted by most liked
* View information of a single blog (author, title, URL, number of likes)
* Adding blogs
* Liking blogs
* Commenting blogs
* Removing blogs (only those added by self)
* View how many and what blogs have been added by each user
* Authentication / Login

## Main Technologies
Tech  | Purpose
----- |--------
React |Front-end
Node  |Server
Express| Server
MongoDB|Database
Redux  |State management
Cypress|E2E-testing
react-bootstrap| Styling

## Environment variables
Variable|Description|Example
--------|-----------|--------
PORT|   port where backend api is running|5001
SECRET|secret key for JSON web tokens| "secretkey"
MONGODB_URI| URI for connecting to MongoDB| "mongodb+srv://[username]:[password]@[host]/[database]?[options]"
TEST_MONGODB_URI| URI for database for running tests| "mongodb+srv://[username]:[password]@[host]/[database]?[options]"
SKIP_PREFLIGHT_CHECK|Avoid dependency conflict error| true

## How to set up
1. Clone the repository
2. run `'npm install'` in the root directory
3. Set environment variables (in an .env file). Front end will not install without SKIP_PREFLIGHT_CHECK=true
4. run `'npm run build'` in the root to install and build the frontend
5. `'npm start'` to start the server
6. Open browser at localhost:5001 (or whatever port is set in the PORT environment variable)

<p>Frontend will then be served as a static file for requests not meant for the api</p>
<p>While developing, frontend can also be started by running 'npm start' in the frontend directory. 
In that case api requests will be proxied from frontend to the backend port. The backend port has to be set to the frontend's package.json file's "proxy" property (default 5001)</p>
<p>Currently users have to be created manually. See example in the requests folder 'add_user.rest' file.</p>

## Deploying to Heroku
The app can easily be deployed to Heroku from the root. Just remember to set up environment variables at Heroku. Of course you also need a running MongoDB. Procfile for Heroku is included already.

## Deployed demo
<p>The app is deployed on Heroku at: https://glacial-sands-00960.herokuapp.com/</p>
Accounts for testing: <br>
<br>

Username | Password
---------|----------
superuser|super
vvirtanen|salasana

## Improvements that could be done
### The SKIP_PREFLIGHT_CHECK=true solution is not so good. 
With this directory structure, where the frontend is in a subdirectory of the backend, 
there is a conflict with dependencies (Jest, for example) when installing frontend. Skipping the preflight check is a quickfix for that. Probably
a better solution would be to put frontend in the same level as backend folder. That would make deploying to Heroku
slightly trickier, since the app needs to be in the root folder when deployed to Heroku. Of course, could also put the frontend to
a completely different repository.

### Tests are not nearly complete

### Error handling is not consistent or complete

### Use Websockets or something for updating the state if data in database changes.

### User management through UI