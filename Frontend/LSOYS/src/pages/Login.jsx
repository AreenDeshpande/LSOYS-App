import React, { useState } from "react";
import "../css/login.css"

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");

  const handleLogin = () => {
    if (username && password) {
      setUser({ username, role });
    }
  };

  return (
    <div >
      <h2 >Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="farmer">Farmer</option>
        <option value="transporter">Transporter</option>
      </select>
      <button onClick={handleLogin} >Login</button>
    </div>
  );
};


export  default Login






