import  { useState } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [role, setRole] = useState('farmer'); // Default role
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }), // Include role in request
        });

        const data = await response.json();

        if (response.ok) {
            if (isLogin) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard'; // Or use React Router
            } else {
                // Signup successful, maybe redirect to login or display a success message
                setIsLogin(true); // Switch to login form
            }
        } else {
            setError(data.message || 'An error occurred.');
        }
    } catch (err) {
        setError('An error occurred. Please try again later.');
        console.error("Auth Error:", err);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">Role:</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="transporter">Transporter</option>
        </select><br />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </p>
    </div>
  );
}

export default Auth;