# Gif-It

Make Gifs from any Any Video

# During Development:

Remove the NODE_ENV=production environment varaible(if existing) from .env file.
npm start => To Start the Server for react
npm serve => To Start the backend express server

# For Production:

To See how Application will run during production.

1. Put the NODE_ENV=production environment varaible in .env file.
2. npm run build => To put all the newer html/css/js files to build folder (This will not be pushed to GitHub as it is ignored in .gitignore)
3. npm run serve => To Start the backend express server. Note: Now server.js file will host the html/css/js files from build folder(created from npm run build command in project root).

Test your stuff now at REACT_APP_BACKEND_ORIGIN in browser, and push to repo.
