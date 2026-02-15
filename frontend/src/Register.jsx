import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    college: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const API = "https://devsphere-backend-r83a.onrender.com";

      const response = await axios.post(`${API}/register`, {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        username: formData.username,
        college: formData.college,
        dob: formData.dob,
        gender: formData.gender,
        password: formData.password,
      });


      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="mobile"
          onChange={handleChange}
          placeholder="Mobile Number"
          required
        />
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="college"
          onChange={handleChange}
          placeholder="College Name"
          required
        />
        <input name="dob" type="date" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
