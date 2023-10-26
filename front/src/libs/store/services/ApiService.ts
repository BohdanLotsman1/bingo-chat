import axios, { AxiosResponse } from "axios";

export class ApiService {
  getRooms(): Promise<AxiosResponse> {
    return axios.get(`${process.env.REACT_APP_API_HOST}/rooms`);
  }
}
