import React from "react";

const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.userID}>{user.userName} - {user.email}</li>
        ))}
    </ul>
);

export default UserList;
