# Developer's notes
Note: Backend was built with Node.js and PostgreSQL

1) Open a Ubuntu terminal 
2) Run the Steps below:
  - run command in linux terminal: sudo service postgresql start
  - Must create a local DB named ``cardex``
  - psql create DB command: ``<username>=# create database cardex;``
  - *To populate AND reintialize* the Database run: ``npm run start:database``
  - Or to launch Database without repopulating run: ``npm start server:dev``
3) Open another terminal
4) If first launch continue else Skip to step 5:
  - Delete package-lock.json, node_modules folder
  - Run command "npm i" in your terminal
5) Run command ``npm run start:frontend``

Site should be running locally.

**Useful postgres commands**
\l - list all databases current user has access to
\c database_name; edit that database


# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
