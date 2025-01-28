import { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser } from "../services/api";

const UserViewModel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleAddUser = async (newUser) => {
        await addUser(newUser);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
    };

    const handleUpdateUser = async (updatedUser) => {
        await updateUser(updatedUser);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
    };

    return { users, handleAddUser, handleUpdateUser };
};

export default UserViewModel;
