import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';


function LoginForm() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required.');
    } else if (!validateEmail(email)) {
      setError('Invalid email format.');
    } else {
      setError('');
        setUser({ email, role });
        navigate(`/${role}-dashboard`);
    }
  };

    return (
        <div className="container">
            <h2>Select Role</h2>
            <div className="role-buttons">
                <button onClick={() => setRole('student')}>Student</button>
                <button onClick={() => setRole('staff')}>Staff</button>
                <button onClick={() => setRole('admin')}>Admin</button>
            </div>
            {role && (
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>
            )}

      </div>
  );
}

export default LoginForm;