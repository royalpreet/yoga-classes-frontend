import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import API from '../api';

import '../styles/signin.css';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.length < 4){
      alert('Password must be atleast 4 characters long.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await API.post('/auth/signup', { name, email, password });
      console.log('signUp ', res.data);

      const userId = res.data.user.id;
      console.log('UserId is ', userId);
      const resEnrollment = await API.post('/enrollment/add', { userId });
      console.log('Enrollment data ', resEnrollment.data);

      setLoading(false);
      login(res.data);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log('signUp error', error);
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
      <h1>Sign Up</h1>
    </div>

    <p className='error'>{error ? error : null}</p>

    <div class="d-flex justify-content-center">
    <form onSubmit={(e) => handleSubmit(e)}>
      <div class="mb-3">
        <label for="exampleInputName1" class="form-label">Name</label>
        <input onChange={(e) => setName(e.target.value)} name="name" value={name} required type="text" class="form-control" id="exampleInputName1"/>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} name="email" value={email} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} name="password" value={password} required type="password" class="form-control" id="exampleInputPassword1"/>
        <div id="emailHelp" class="form-text">Password must be atleast 4 characters long.</div>
      </div>
      <div class="col-md-12 text-center">
        <button type="submit" class="btn btn-success" disabled={loading}>{loading ? 'wait...' : 'Register'}</button>
      </div>
    </form>

    </div>

    <div class="text-center">
      <p>
        Already have an account? <Link to='/login'>Login</Link>.
      </p>
    </div>
    </>
  );
}
