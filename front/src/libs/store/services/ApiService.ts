import axios, { AxiosResponse } from "axios";

export class ApiService {
  // API_HOST = process.env.REACT_APP_API_HOST;

  getRooms (): Promise<AxiosResponse> {
    return axios.get(`http://localhost:5000/rooms`);
  }
}
