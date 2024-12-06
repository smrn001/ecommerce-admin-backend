import { jwtDecode } from "jwt-decode";
export const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded?.role === "admin";
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
