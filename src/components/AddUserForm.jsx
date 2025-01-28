import React, { useState } from "react";

const AddUserForm = ({ onAddUser }) => {
    const [userName, setUserName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDOB] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        const newUser = { userName, middleName, lastName, dob, address, country, contactNo, email };
        onAddUser(newUser);
    };

    return (
        <div>
            <input placeholder="First Name" onChange={(e) => setUserName(e.target.value)} />
            <input placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)} />
            <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
            <input placeholder="DOB" onChange={(e) => setDOB(e.target.value)} />
            <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            <input placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
            <input placeholder="Contact No" onChange={(e) => setContactNo(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>Add User</button>
        </div>
    );
};

export default AddUserForm;
