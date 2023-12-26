import { axiosInstance } from "../../axiosInstance";

export const registerUser = async (registerData: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/register", registerData);
    return response.data;
  } catch (e: any) {
    console.log(e);
    throw e.response.data.message || "Error registering user";
  }
};

export const loginUser = async (loginData: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (e: any) {
    throw e.response.data.message || "Error logging in user";
  }
};
