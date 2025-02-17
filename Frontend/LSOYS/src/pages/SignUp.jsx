import React, { useState } from "react";
import "../css/signup.css"; 

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!username || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      console.log({ username, password, role }); // Simulating signup API call
      setLoading(false);
      alert("Signup Successful!");
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="card-container">
      <h2>Signup</h2>
      {error && <p className="error-text">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="farmer">Farmer</option>
        <option value="transporter">Transporter</option>
      </select>
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing Up..." : "Signup"}
      </button>
    </div>
  );
};

export default SignUp;
