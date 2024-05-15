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
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,{
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
