import axios from "axios";
import API_URL from "../config";

// GET endpoints
export const getAllStudents = async () =>
    await axios.get(`${API_URL}/Students`);

export const getStudent = async (id: number) =>
    await axios.get(`${API_URL}/Students/${id}`);

export const getStudentNationatliy = async (id: number) =>
    await axios.get(`${API_URL}/Students/${id}/Nationality`);

export const getStudentFamilyMembers = async (id: number) =>
    await axios.get(`${API_URL}/Students/${id}/FamilyMembers`);

export const getFamilyMemberNationality = async (id: number) =>
    await axios.get(`${API_URL}/FamilyMembers/${id}/Nationality`);

// POST endpoints
export const addStudent = async (studentData: any) =>
    await axios.post(`${API_URL}/Students`, studentData);

export const addNewFamilyMember = async (studentId: number, memberData: any) =>
    await axios.post(`${API_URL}/Students/${studentId}/FamilyMembers/`, memberData);

// PUT endpoints

export const updateStudentBasicDetails = async (id: number, studentData: any) =>
    await axios.put(`${API_URL}/Students/${id}`, studentData);

export const updateStudentNationality = async (
    id: number,
    nationalityId: number
) => await axios.put(`${API_URL}/Students/${id}/nationality/${nationalityId}`);

export const updateFamilyMember = async (member: any) =>
    await axios.put(`${API_URL}/FamilyMembers/${member.ID}`, member);

export const updateFamilyMemberNationality = async (memberId: number, nationalityId: number) =>
    await axios.put(`${API_URL}/FamilyMembers/${memberId}/Nationality/${nationalityId}`);

// DELETE endpoints

export const deleteFamilyMember = async (id: number) =>
    await axios.delete(`${API_URL}/FamilyMembers/${id}`);