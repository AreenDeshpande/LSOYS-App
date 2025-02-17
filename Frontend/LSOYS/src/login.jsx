import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'farmer', // default role is farmer
  });
  const [error, setError] = useState('');
  const history = useHistory(); // for routing

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token in localStorage (or context/state management)
        localStorage.setItem('token', data.token);

        // Redirect based on role:
        // The backend can return the role; if not, we can use the formData.role.
        const userRole = data.role || formData.role;
        if (userRole === 'farmer') {
          history.push('/dashboard/farmer');
        } else if (userRole === 'transporter') {
          history.push('/dashboard/transporter');
        }
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="farmer">Farmer</option>
          <option value="transporter">Transporter</option>
        </select>
        <br />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>

      <p
        style={{ cursor: 'pointer', textDecoration: 'underline', marginTop: '10px' }}
        onClick={() => {
          setIsLogin(!isLogin);
          setError('');
        }}
      >
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </p>
    </div>
  );
}

export default Auth;
