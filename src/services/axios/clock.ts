import { ClockinType,ClockOutType } from "@/types/clock.type";
import api from "./index";

export const clockIn = async (data: ClockinType) => {
  const response = await api.post("/api/clock/clock-in", data);
  const resp = response.data;
  return resp;
};


export const clockOut = async (data: ClockOutType) => {
    const response = await api.put("/api/clock/clock-out", data);
    const resp = response.data;
    return resp;
  };


  export const getClocksData = async (url: string) => {
    const response = await api.get(url);
    const resp = response.data;
    return resp;
  };
