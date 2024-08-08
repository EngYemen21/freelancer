import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './../../axios/axios'; // Assuming axios is configured

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationToken, setVerificationToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const verifyEmail = async () => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    if (!token) {
      console.warn('No verification token found in URL.');
      return; 
    }
    setVerificationToken(token);
    try {
      const response = await axios.post('/verify-email', { token });
      setVerificationStatus(response.data.status);
      setIsLoading(false);
      if (response.data.status === 'success' && response.data.token) {
        localStorage.setItem('token', token);
        navigate('/login');     
      }
    } catch (error) {
      setVerificationStatus('error'); 
       setIsLoading(false);
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  const handleResendEmail = async () => {
    console.log("Error اعد ارسال التوكن")
  };
  return (
    <div className='p-6'>
<div className='bg-gray-200 container mx-auto p-10 text-center'>
      <h1>تحقق من البريد الالكتروني</h1>
      {verificationStatus === 'success' && (
        <>
          <p>Email verified successfully!</p>
          <button onClick={() => navigate('/login')} className='bg-green-500  text-white p-2 m-2'>
            Login
          </button>
        </>
      )}
      {verificationStatus === 'error' && (
        <>
          <p>فشل التحقق من البريد الالكتروني , حاول مرة اخرى.</p>
          <button onClick={handleResendEmail} className='bg-green-500 p-3 rounded-md text-white  m-2'>
            Resend Email
          </button>
        </>
      )}
      {verificationStatus === '' &&  <p className='p-4'>فضلا , اذهب بريدك الالكترني وتحقق من الحساب الخاص بك...</p>
}
    </div>
    </div> 
  );
};

export default EmailVerification;
