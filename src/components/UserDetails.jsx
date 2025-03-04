import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [id]); // Only depends on `id` param

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]); // Include fetchUserDetails as a dependency

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
