import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const API = "https://devsphere-backend-r83a.onrender.com";

    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });


    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful ✅");
      window.location.href = "/profile";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server error");
  }
};
  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Email or Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
