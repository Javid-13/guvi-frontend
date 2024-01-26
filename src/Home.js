import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://guvi-backend-65kz.onrender.com/home/${id}`)
            .then((res) => {
                setUserData(res.data);
                setName(res.data.name || "");
                setGender(res.data.gender || "");
                setMobileNumber(res.data.mobileNumber || 0);
                setDateOfBirth(res.data.dateOfBirth || "");
                setAge(calculateAge(res.data.dateOfBirth) || "");
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const calculateAge = (birthDate) => {
        if (!birthDate) return "N/A";
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        const dayDiff = today.getDate() - birthDateObj.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const handleUpdateProfile = () => {
        if (userData) {
            const updatedData = {
                name,
                age,
                gender,
                mobileNumber,
                dateOfBirth,
            };
            const birthDate = new Date(dateOfBirth);
            const today = new Date();
            const ageDiff = today.getFullYear() - birthDate.getFullYear();
            const isBirthdayPassed =
                today.getMonth() > birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

            const calculatedAge = isBirthdayPassed ? ageDiff : ageDiff - 1;

            updatedData.age = calculatedAge;

            axios
                .put(`https://guvi-backend-65kz.onrender.com/signup/${id}`, updatedData)
                .then((res) => {
                    console.log("Profile updated successfully:", res?.data?.updatedUser);
                    setName(res.data.updatedUser.name || "");
                    setAge(calculateAge(res.data.updatedUser.dateOfBirth) || "N/A");
                    setGender(res.data.updatedUser.gender || "");
                    setMobileNumber(res.data.updatedUser.mobileNumber || 0);
                    setDateOfBirth(res.data.updatedUser.dateOfBirth || "");
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                });
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="homepage container">
            <h1>Hello, <span style={{ color: "red" }}>{userData && userData.name}</span></h1>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Date of Birth:</label>
                <input
                    type="date"
                    className="form-control"
                    value={formatDate(dateOfBirth)}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            {/* <div className="mb-3">
                <label className="form-label">Age:</label>
                <input type="text" className="form-control" value={age} readOnly />
            </div> */}
            <div className="mb-3">
                <label className="form-label">Mobile Number:</label>
                <input
                    type="number"
                    className="form-control"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>Update Profile</button>
            <div className="mt-3"></div> {/* Added spacing here */}
            <h1>Profile</h1>
            <h3>Name: {userData?.name}</h3>
            <h3>Date Of Birth: {formatDate(userData?.dateOfBirth)}</h3>
            <h3>Gender: {userData?.gender}</h3>
            <h3>Age: {calculateAge(userData?.dateOfBirth)}</h3>
            <h3>Mobile Number: {userData?.mobileNumber}</h3>
            <Link to="/" className="btn btn-secondary mt-3">Logout</Link>
        </div>
    );
}

export default Home;
