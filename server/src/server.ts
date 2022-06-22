import express from "express";
import { graphqlHTTP } from "express-graphql"
import { rootSchema } from "./graphql/schema";
import { connectDB } from "./db/dbconfig";
import "dotenv/config"
import Auth from "./services/authService";




const app: express.Application = express()
const PORT: number = 8008

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

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: rootSchema,
//     graphiql: true,
//   }));

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
