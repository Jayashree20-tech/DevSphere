import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/EditProfile");
  };

  if (!user) return null;

  return (
    <div className="container">
      <h2>Welcome {user.fullName} 🎉</h2>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="profile"
        width="120"
        style={{ marginBottom: "20px" }}
      />

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      {user.bio && (
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
      )}

      {user.github && (
        <p>
          <strong>GitHub:</strong>{" "}
          <a href={user.github} target="_blank" rel="noreferrer">
            {user.github}
          </a>
        </p>
      )}

      {user.linkedin && (
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a href={user.linkedin} target="_blank" rel="noreferrer">
            {user.linkedin}
          </a>
        </p>
      )}

      {user.skills && (
        <p>
          <strong>Skills:</strong> {user.skills}
        </p>
      )}

      <button onClick={handleEdit}>Edit Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
