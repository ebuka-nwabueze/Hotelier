import express from "express";
import { graphqlHTTP } from "express-graphql"
import path from "path";
import {fileURLToPath} from 'url';
import { rootSchema } from "./graphql/schema.js";
import { connectDB } from "./db/dbconfig.js";
import "dotenv/config"
import Auth from "./services/authService.js";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);




const app: express.Application = express()
const PORT: string | number = process.env.PORT || 8008

connectDB()

// app.use(protectRoutes)

app.use(
  '/graphql',
  graphqlHTTP((req) => {
    const authHeader = req.headers.authorization
    return {
        schema: rootSchema,
        graphiql: true,
        context: {
          user: Auth.getUser(authHeader)
          }
        }
    }
));

//serve react app during production.
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    // respond with "Welcome...." when a GET request is made to the homepage
    res.status(200).json({ message: "Welcome to Hotelier App" });
  });
}


app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
