import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email address");
            return;
        }


        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("https://guvi-backend-65kz.onrender.com/signup", {
                name, email, password, confirmPassword
            });

            if (response.data === "exist") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                alert("User does not exist");
            } else if (response.data === "SUCCESS") {
                alert("Registered successfully");
                navigate("/");
            }
        } catch (error) {
            alert("Error: Please check your details and try again.");
            console.error(error);
        }
    }

    return (
        <div className="signup container">
            <h1 className="mb-4">Signup</h1>
            <form>
                <div className="mb-3">
                    <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} placeholder="Name" required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Password" required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
            </form>
            <div className="mt-4">
                <p>OR</p>
                <Link to="/" className="btn btn-secondary">Log In Page</Link>
            </div>
        </div>
    );
}

export default Signup;