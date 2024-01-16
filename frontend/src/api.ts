import axios, { AxiosError } from "axios";

// Create a .env file within /frontend locally to set
// REACT_APP_URL (locally, it will be 'http://localhost')
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export interface Response {
  success: boolean;
  message: string;
}

export interface VolunteerResponse {
  success: boolean;
  payload: Volunteer | undefined;
  message: string;
}

/**
 * The schema of the volunteer
 */
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

/**
 * Gets every volunteer in the database
 *
 * @returns an array of all volunteers
 */
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

/**
 * Deletes a volunteer given an id.
 *
 * @param id the id of the volunteer to delet
 * @returns a Response indicating success status and error messages
 */
export async function deleteVolunteer(id: string): Promise<Response> {
  try {
    await instance.delete(`/api/bog/users/delete/${id}`);
    return { success: true, message: "Volunteer successfully deleted!" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Updates a volunteer. Does not return the volunteer since the sever right now
 * doesn't do any validation, so it just trusts the client.
 *
 * @param updatedVolunteer The volunteer to update
 * @returns A VolunteerResponse where the payload is guaranteed to be undefined, as this is only used by createVolunteer
 */
export async function updateVolunteer(
  updatedVolunteer: Volunteer
): Promise<VolunteerResponse> {
  try {
    await instance.put(
      `/api/bog/users/update/${updatedVolunteer.id}`,
      updatedVolunteer
    );
    return { success: true, payload: undefined, message: "Volunteer Updated!" };
  } catch (error: any) {
    return { success: false, payload: undefined, message: error.message };
  }
}

/**
 * Creates a new volunteer. It has to return that same volunteer because
 * the id and notes attribute have to be populated for the rest of it to work
 * @param volunteer the volunteer to create
 * @returns a VolunteerResponse containing the new Volunteer
 */
export async function createVolunteer(
  volunteer: Volunteer
): Promise<VolunteerResponse> {
  try {
    const response = await instance.post("/api/bog/users/create", volunteer);
    return {
      success: true,
      payload: response.data,
      message: "Volunteer Added!",
    };
  } catch (error: any) {
    return { success: false, payload: undefined, message: error.message };
  }
}
