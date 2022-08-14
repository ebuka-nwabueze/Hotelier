# Hotelier Application

This application is a support application for creating request tickets to a service desk team.

##

The application is developed using TypeScript for MERN Stack.

Other info:

- It uses graphql(express-graphql) as an API to connect the server.
- React-query for the client side state management.
- A potential addition is the use of Material UI and rsjs forms for the create and update features.

## How to run

Firstly, create a `.env` file and set these environmental variables `DB_URI`, `JWT_TOKEN`, `PORT`

- `DB_URI` is a connection string used to connect NodeJs and MongoDB. You can create one [here](https://account.mongodb.com/account/login)

- `JWT_TOKEN` is an encryption token used for encyrpting user info during sign in/ sign up. Recommendation is to create a SHA256 key. You can use the code below in your terminal:

```
python3 -c 'import base64; import os; print(base64.encodebytes(os.urandom(32)))'
```
Secondly, install tthe depeendencies.
- In the root direcory,  run ``` npm install ``` for the server dependencies.
- Change directory to client. run  ``` npm install ``` for the client dependencies.

In the local directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
