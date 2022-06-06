import axios from "axios";

const API_URL = "/graphql";

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
}

export interface UserResponseData {
  token: string;
  id: string;
  name: string;
  email: string;
}

//Register user

export const authRegister = async (userData: UserRegisterData) => {
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


  const response = await axios.post<UserResponseData>(API_URL, graphqlQuery);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
export const authLogin = async (userData: UserLoginData) => {
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
      password
    },
  };

  const response = await axios.post<UserResponseData>(API_URL, graphqlQuery);
  console.log(response)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Log out user
export const authLogout = () => localStorage.removeItem("user");
