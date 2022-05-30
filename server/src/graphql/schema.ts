import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} from "graphql";
import Ticket from "../models/TicketModel";
import User, { IUser } from "../models/UserModel";
import Auth from "../services/authService";

const TicketType = new GraphQLObjectType({
  name: "TicketType",
  description: "A type definition for a single Ticket",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "This is a Mongoosse Object ID of the ticket",
    },
    user: {
      type: new GraphQLNonNull(GraphQLInt),
      description:
        "This is a Mongoosse Object ID of a user that created the ticket",
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "This is a description of the ticket",
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      description: "This is the status of the ticket",
    },
  }),
});
const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "A type definition for a single user",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "This is a Mongoosse Object ID of the user",
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "This is a name the User",
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "This is a email the User",
    },
    isAdmin: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "This is the admin status of a user",
    },
  }),
});

const AuthUserType = new GraphQLObjectType({
  name: "AuthUserType",
  description: "A return type for User Logged in or Signed Up",
  fields: () => ({
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: "This is a token for the signed in User",
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "This is the entrypoint for the query",
  fields: () => ({
    tickets: {
      type: new GraphQLList(TicketType),
      description: "This is a list of the tickets",
      resolve: async () => {
        return await Ticket.find({});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      description: "This is a list of all users",
      resolve: async (parent, _, { user }) => {
        try {
          if (!user?.id) throw new Error("You must be Authenticated");

          const dbUser = await User.findById(user.id);
          if (dbUser?.isAdmin !== true)
            throw new Error("You must be an Admin to perform this task");
          // return {id: dbUser?.id,name: dbUser?.name, email: dbUser?.email, isAdmin: dbUser?.isAdmin}
          return await User.find({}).select("-password");
        } catch (error) {
          let errorMessage = "Error getting users";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.log(errorMessage);
          throw new Error(errorMessage);
        }
      },
    },
    user: {
      type: UserType,
      description: "This is a single user",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, { id }, { user }) => {
        try {
          console.log(user);
          if (!user?.id) throw new Error("You must be Authenticated");
          if (user?.id !== id) throw new Error("You are not Authorized");
          const dbUser = await User.findById(user.id).select("-password");
          // return {id: dbUser?.id,name: dbUser?.name, email: dbUser?.email, isAdmin: dbUser?.isAdmin}
          return dbUser;
        } catch (error) {
          let errorMessage = "Cannot find user";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.log(errorMessage);
          throw new Error(errorMessage);
        }
      },
    },
  }),
});

// continue editing the mutation. How will you add the user, id
// Also the timestamps which gets created automatically

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "This is the entyrypoinnt to the mutation",
  fields: () => ({
    // addTicket: {
    //   type: TicketType,
    //   description: "This is a mutation to add a ticket",
    //   args: {

    //   }
    // }
    addUser: {
      type: AuthUserType,
      description: "This is the mutation to add a user to the DB",
      args: {
        name: {
          type: GraphQLString,
          description: "Name of the user",
        },
        email: {
          type: GraphQLString,
          description: "Email of the user",
        },
        password: {
          type: GraphQLString,
          description: "Password of the user",
        },
      },
      resolve: async (_, { name, email, password }) => {
        try {
          if (!email || !password || !email)
            throw new Error("name, email and password required");
          const user = await User.findOne({ email });
          if (user) throw new Error("User with email already exist");
          const hashedPassword = await Auth.hashPassword(password);
          const newUser = new User({ name, email, password: hashedPassword });
          newUser.id = newUser._id;
          const token = Auth.generateJwt(newUser.id);
          await newUser.save();
          return { token };
        } catch (error) {
          let errorMessage = "Failed to add new User";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.log(errorMessage);
          throw new Error(errorMessage);
        }
      },
    },
    login: {
      type: AuthUserType,
      description: "This is the mutation to log a user",
      args: {
        email: {
          type: GraphQLString,
          description: "Email of the user",
        },
        password: {
          type: GraphQLString,
          description: "Password of the user",
        },
      },
      resolve: async (_, { email, password }) => {
        try {
          if (!email || !password)
            throw new Error("email and password required");
          const user = await User.findOne({ email });
          if (!user) throw new Error("Invalid user credentials");
          const passwordCorrect = await Auth.matchPassword(
            password,
            user.password
          );
          if (!passwordCorrect) throw new Error("Invalid user credentials");
          const token = Auth.generateJwt(user.id);
          return { token };
        } catch (error) {
          let errorMessage = "Failed to login User";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.log(errorMessage);
          throw new Error(errorMessage);
        }
      },
    },
  }),
});

export const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
