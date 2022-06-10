import axios from "axios";

const API_URL = "/graphql";

//Types and interface will be refactored into its own file

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

export interface UserRegisterResponse {
  data: {
    addUser: UserResponseData
  }
  errors: {
    message: string
  }
}

export interface UserLoginResponse {
  data: {
    login: UserResponseData
  },
  errors: [
    { message: string}
  ]
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


  const response = await axios.post<UserRegisterResponse>(API_URL, graphqlQuery);
  if (response.data.data.addUser) {
    localStorage.setItem("user", JSON.stringify(response.data.data.addUser));
  }
  return response.data.data.addUser;
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

  const response = await axios.post<UserLoginResponse>(API_URL, graphqlQuery);
  console.log("authService login:",response.data.data.login)
  const condition1 = response.data.data.login !== null
  if (condition1) {
    localStorage.setItem("user", JSON.stringify(response.data.data.login));
  }else if ( !condition1){
    console.log("Login authService:",response.data.errors[0].message)
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.login;
};

// Log out user
export const authLogout = () => localStorage.removeItem("user");
