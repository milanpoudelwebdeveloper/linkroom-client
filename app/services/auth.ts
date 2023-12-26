import { axiosInstance } from "../axiosInstance";

export const registerUser = async (registerData: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/login", registerData);
    return response.data;
  } catch (e: any) {
    throw e.response.data.message || "Error registering user";
  }
};
