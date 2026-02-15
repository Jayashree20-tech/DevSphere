import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>DevSphere</h1>

      <div className="home-buttons">
        <button onClick={() => navigate("/register")}>Create Account</button>

        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
}

export default Home;
