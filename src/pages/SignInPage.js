import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API from '../api';
import { useAuth } from '../hooks/useAuth';

import '../styles/signin.css';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const res = await API.post('/auth/login', { email, password });
      console.log('login ', res.data);
      setLoading(false);
      login(res.data);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log('login error', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <>
    <div class="d-flex justify-content-center my-3">
      <h1>Sign In</h1>
    </div>

    <p className='error'>{error ? error : null}</p>

    <div class="d-flex justify-content-center">
    <form onSubmit={(e) => handleSubmit(e)}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} name="email" value={email} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} name="password" value={password} required type="password" class="form-control" id="exampleInputPassword1"/>
      </div>
      <div class="col-md-12 text-center">
        <button type="submit" class="btn btn-success" disabled={loading}>{loading ? 'wait...' : 'Login'}</button>
      </div>
    </form>

    </div>

    <div class="text-center">
      <p>
        First time? <Link to='/signup'>Create an account</Link>.
      </p>
    </div>

    </>
  );
}
