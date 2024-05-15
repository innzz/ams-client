import { AxiosRequestConfig } from "axios";
import api from "./index";

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "multipart/form-data", // Specify the content type for multipart form data
};

export const uploadImage = async (formData: FormData) => {
  const response = await api.post("/api/upload", formData, { headers });
  const data = response.data;
  return data;
};

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "amsCloud");
  formData.append("cloud_name", "ddgm6ub4u");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/ddgm6ub4u/image/upload",{
      method: "POST",
      body: formData
    });

    const cloudData = await res.json();
    return cloudData.url

  } catch (error) {
    console.log(error)
    throw new Error()
  }
};
