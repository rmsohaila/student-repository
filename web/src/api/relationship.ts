import axios from "axios";
import API_URL from "../config";

export const getAllRelationships = async () =>
    await axios.get(`${API_URL}/Relationships`);
