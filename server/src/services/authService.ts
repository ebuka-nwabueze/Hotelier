import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express"
import { JWT_TOKEN } from "../config";

type ReqObject = {
  request: any
}

type UserId = {
  req: ReqObject;
  authToken: string 
}

class Auth {
  constructor() {}

  static async hashPassword(password: string): Promise<string> {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async matchPassword(
    inputPassword: string,
    hashedDbPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedDbPassword);
  }

  //check if the id passed in to generate this is actually a string or int
  static generateJwt(id: string) {
    return jwt.sign({ id }, JWT_TOKEN, { expiresIn: "30d" });
  }

  static getJwtPayload(token: string) {
    return jwt.verify(token, JWT_TOKEN);
  }
  
  //returns null or the payload
  static getUser(authHeader: string | undefined ){
    if (authHeader) {
      try {
          // return the user information from the token
          const token = authHeader.replace("Bearer ", "")
          return jwt.verify(token, JWT_TOKEN);
      } catch (err) {
          // if there's a problem with the token, throw an error
          throw new Error('Session invalid');
      }
  } else {
    return null
  }
  }
}

export default Auth;
