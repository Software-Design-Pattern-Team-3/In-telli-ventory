import { DeleteUserByID, getAllUsers } from "./api";

const getAllUsersData = async () => {
    try {
        const response = await getAllUsers();
        return response?.data;
    } catch (error) {
        throw new Error('Failed to fetch users: ' + (error.message || 'An error occurred'));
    }
};

const deleteUser = async (uid) => {
    try {
        const response = await DeleteUserByID(uid);
        return response?.data;
    } catch (error) {
        throw new Error('Failed to delete user: ' + (error.message || 'An error occurred'));
    }
};

export const Admin = { getAllUsersData, deleteUser };