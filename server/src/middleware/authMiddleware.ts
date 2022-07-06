import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import express from "express"
import {JWT_TOKEN} from "../config"

export const protectRoutes = async(req:express.Request , res:express.Response, next:express.NextFunction) => {
  let token;
 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) { 
    try {
      // Get token from Header
      token = req.headers.authorization.split(" ")[1];
      // Verify Token and return payload
      const decoded =  jwt.verify(token, JWT_TOKEN);
      console.log(decoded)
      console.log(token)
      // Get User from DB using payload
      const user = await User.findById(decoded).select("-password");
      // req.user = user;
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not Authorized");
    }
  }
  // if (!token) {
  //   throw new Error("Not Authorized");
  // }
  // next()
};