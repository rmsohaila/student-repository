import axios from "axios";
import API_URL from "../config";

export const getAllNationalities = async () =>
    await axios.get(`${API_URL}/Nationalities`);
