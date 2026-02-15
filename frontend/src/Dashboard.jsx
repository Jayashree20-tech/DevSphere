import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/dashboard", {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        navigate("/login");
        return;
      }

      const data = await response.json();
      setUser(data);
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h2>Welcome {user.fullName}</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>College: {user.college}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
