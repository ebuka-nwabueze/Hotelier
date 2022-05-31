"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./graphql/schema");
const dbconfig_1 = require("./db/dbconfig");
require("dotenv/config");
const authService_1 = __importDefault(require("./services/authService"));
const app = (0, express_1.default)();
const PORT = 8008;
(0, dbconfig_1.connectDB)();
// app.use(protectRoutes)
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => {
    const authHeader = req.headers.authorization;
    return {
        schema: schema_1.rootSchema,
        graphiql: true,
        context: {
            user: authService_1.default.getUser(authHeader)
        }
    };
}));
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.rootSchema,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
