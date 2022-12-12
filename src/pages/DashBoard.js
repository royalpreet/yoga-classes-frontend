import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/dashboard.css';
import API from '../api';

export default function DashBoard() {
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [lastDate, setLastDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchEnrollmentData() {
      try {
        document.getElementById("enrollNowText").style.display = "none";
        document.getElementById("enrolledText").style.display = "none";
        document.getElementById("slotText").style.display = "none";
        console.log('Inside fetchEnrollmentData function');
        setError(null);
        const res = await API.post('/enrollment/receive', { user });
        console.log('Enrollment details received on frontend', res.data);
        const enrollmentDetails = res.data.enrollmentDetails;
        
        const endDate = new Date(enrollmentDetails[0].subscription_end_date);
        const current = new Date();
        const currDate = new Date(current.getFullYear(), current.getMonth(), current.getDate());
        if(enrollmentDetails[0].enrollment_date == null || currDate > endDate){
          setIsEnrolled(false);
          document.getElementById("enrollNowText").style.display = "block";
        }
        else{
          document.getElementById("enrolledText").style.display = "block";
          document.getElementById("slotText").style.display = "block";
        }
        document.getElementById("waitText").style.display = "none";

        setLastDate(endDate.toString().substring(0, 10));

        var slot;
        const s = enrollmentDetails[0].slot;
        if(s == 1) slot = "6-7 AM";
        else if(s == 2) slot = "7-8 AM";
        else if(s == 3) slot = "8-9 AM";
        else slot = "5-6 PM";
        setSlot(slot);

        
      } catch (error) {
        setError(error?.response?.data?.message);
        console.log('Enrollment details fetch error', error);
      }
    }
    fetchEnrollmentData();//.then(result => {});
  }, []);

  return (
    <>
    <p className='error'>{error ? error : null}</p>

    <div className='dashboard text-center'>
      <div className='my-4'>
        <h3>Hi, {user.name}</h3>
      </div>

      <div id="waitText">
        <h4 className="text-danger">Wait...</h4>
      </div>

      <div id="enrollNowText">
        <h4>You don't have a subscription. <Link to='/enroll'>Enroll now!</Link>.</h4>
      </div>
      
      <div id="enrolledText">
        <h4>You are enrolled. Your subscription ends on {lastDate}.</h4>
      </div>
      <div className='my-2' id="slotText">
        <h5>Time Slot: {slot}</h5>
      </div>

    </div>
    </>
  );
}
