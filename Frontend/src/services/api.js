export const fetchUsers = async () => {
    const response = await fetch("/api/Users");
    return await response.json();
};

export const addUser = async (user) => {
    await fetch("/api/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
};

export const updateUser = async (user) => {
    await fetch(`/api/Users/${user.userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
};
