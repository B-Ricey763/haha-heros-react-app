import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export interface Response {
  success: boolean;
  message: string;
}

export interface Volunteer {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: string;
  status: boolean;
  id: string;
}

export async function getVolunteers(): Promise<Volunteer[]> {
  try {
    const response = await instance.get<Volunteer[]>("/api/bog/users/");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Axios error
      const axiosError = error as AxiosError;
      console.error("Axios Error:", axiosError.message);
      console.error("Response Status:", axiosError.response?.status);
      console.error("Response Data:", axiosError.response?.data);
    } else {
      // Non-Axios error
      console.error("Non-Axios Error:", error.message);
    }
    return [];
  }
}

export async function deleteVolunteer(name: string): Promise<Response> {
  try {
    const _ = await instance.delete(`/api/bog/users/delete/${name}`);
    return { success: true, message: "Item successfully deleted!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateVolunteer(
  updatedVolunteer: Volunteer
): Promise<Response> {
  try {
    const response = await instance.put(
      `/api/bog/users/update/${updatedVolunteer.id}`,
      updatedVolunteer
    );
    return { success: true, message: "Volunteer Updated!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function createVolunteer(volunteer: Volunteer): Promise<Response> {
  try {
    const response = await instance.post("/api/bog/users/create", volunteer);
    return { success: true, message: "Volunteer Added!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
