## Available Scripts

In the project directory, you can run:

### `npm install`
### Set the enviroment variables
### `npm run start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## Server Configurations

The virtual servers in nginx/sites-available/ should be placed in /etc/nginx/sites-available, and then symlinks to them should be placed in /etc/nginx/sites-enabled.
The main nginx configuration file in nginx/nginx.conf should be placed in /etc/nginx.
Every effort has been made to uniquely name these, but please make sure you aren't over-writing any existing virtual server definition!
