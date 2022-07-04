import { UserResponseData } from "../types/types"

export function getStoredUser(): UserResponseData | null {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

export function getUserData(): Promise<UserResponseData | null> {
  return new Promise((resolve, reject) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    resolve(user)
  })
}