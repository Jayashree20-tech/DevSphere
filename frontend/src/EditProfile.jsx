import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated ✅");
    navigate("/profile");
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>

      <input
        name="bio"
        placeholder="Bio"
        value={user.bio || ""}
        onChange={handleChange}
      />

      <input
        name="github"
        placeholder="GitHub Link"
        value={user.github || ""}
        onChange={handleChange}
      />

      <input
        name="linkedin"
        placeholder="LinkedIn Link"
        value={user.linkedin || ""}
        onChange={handleChange}
      />

      <input
        name="skills"
        placeholder="Skills"
        value={user.skills || ""}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/profile")}>Cancel</button>
    </div>
  );
}

export default EditProfile;
