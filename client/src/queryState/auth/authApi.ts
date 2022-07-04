import axios from "axios";
import {
  UserLoginData,
  UserLoginResponse,
  UserRegisterData,
  UserRegisterResponse
} from "../../types/types";

const API_URL = "/graphql";

export const authLogin = async (
  userData: UserLoginData
) => {
  const { email, password } = userData;

  const graphqlQuery = {
    operationName: "login",
    query: `mutation login($email: String!, $password: String!){
      login(email: $email, password:$password) {
        id
        name
        email
        token
      }
    }`,
    variables: {
      email,
      password,
    },
  };

  const response = await axios.post<UserLoginResponse>(API_URL, graphqlQuery);
  const condition1 = response.data.data.login !== null
  if (condition1) {
    localStorage.setItem("user", JSON.stringify(response.data.data.login));
  }else if ( !condition1){
    console.log("Login authService:",response.data.errors[0].message)
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.login;
};



export const authRegister = async (
  userData: UserRegisterData
) => {
  const { name, email, password } = userData;

  const graphqlQuery = {
    operationName: "addUser",
    query: `mutation addUser($name: String!, $email: String!, $password: String!){
      addUser(name: $name, email: $email, password:$password) {
        id
        name
        email
        token
      }
    }`,
    variables: {
      name,
      email,
      password
    },
  };


  const response = await axios.post<UserRegisterResponse>(API_URL, graphqlQuery);
  console.log("from authRegister",response)
  const condition1 = response.data.data.addUser !== null
  if (condition1) {
    localStorage.setItem("user", JSON.stringify(response.data.data.addUser));
  } else if(!condition1){
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.addUser;

};
