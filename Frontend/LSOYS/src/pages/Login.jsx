import React, { useState } from "react";
import "../css/login.css";

const Login = ({ setUser }) => {
  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const [role, setRole] =useState("farmer");
  const [error,setError] =useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setError("All fields are required!");
      return;
    }


    setError(""); 
    setLoading(true);


    setTimeout(() => {
      setUser({ username, role });
      setLoading(false);
    }, 1000); 


  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="card-container">
      <h2>Login</h2>
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


      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>


    </div>
  );
};

export default Login;
