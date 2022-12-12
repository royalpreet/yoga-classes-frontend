import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api';

export default function EnrollPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;
  const navigate = useNavigate();

  const handlePayFees = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const current = new Date();

      console.log('Year: ', current.getFullYear());
      console.log('Month: ', current.getMonth()+1);
      console.log('Date: ', current.getDate());
      const currDate = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 13);
      console.log('Todays date: ', currDate);

      const lastDate = new Date(current.getFullYear(), current.getMonth()+1, 0, 13);
      console.log('Last date: ', lastDate);

      const selectedOption = parseInt(document.querySelector('input[name="radio1"]:checked').value);

      //const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

      const res = await API.put('/enrollment/change', { userId, currDate, lastDate, selectedOption });
      console.log('enrollment data ', res.data);
      setLoading(false);
      navigate('/', { replace: true });
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log('Fee pay error: ', error);
    }
  };

  return (
    <div className='text-center'>
        <p className='error'>{error ? error : null}</p>
        <form onSubmit={(e) => handlePayFees(e)}>
            <div class="mb-3">
                <label for="exampleInputPhone1" class="form-label">Choose time slot</label>
                &nbsp;&nbsp;
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineCheckbox1" value="1" name="radio1" required/>
                    <label class="form-check-label" for="inlineCheckbox1">6-7 AM</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineCheckbox2" value="2" name="radio1" required/>
                    <label class="form-check-label" for="inlineCheckbox2">7-8 AM</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineCheckbox3" value="3" name="radio1" required/>
                    <label class="form-check-label" for="inlineCheckbox3">8-9 AM</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineCheckbox4" value="4" name="radio1" required/>
                    <label class="form-check-label" for="inlineCheckbox4">5-6 PM</label>
                </div>
            </div>

            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary" disabled={loading}>{loading ? 'wait...' : 'Pay Fees'}</button>
            </div>
      </form>
    </div>
  )
}
