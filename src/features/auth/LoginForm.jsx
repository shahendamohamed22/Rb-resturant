import { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { setCredentials } from './authSlice';

function AuthModal({ show, onClose }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  // shared fields
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // signup-only fields
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!show) return null;

  const resetAndClose = () => {
    setPhone('');
    setPassword('');
    setFullName('');
    setAddress('');
    setConfirmPassword('');
    setErrorMsg('');
    setActiveTab('login');
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(ENDPOINTS.customerLogin, { phone, password });
      dispatch(setCredentials({
        token: response.data.accessToken,
        customerId: response.data.customerId,
        fullName: response.data.fullName,
      }));
      resetAndClose();
    } catch (err) {
      setErrorMsg('Login failed. Check your phone/password.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !phone || !password) {
      setErrorMsg('Please fill in all fields (password must be at least 4 characters).');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('Please fill in all fields (password must be at least 4 characters).');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      const response = await api.post(ENDPOINTS.customerSignup, {
        fullName,
        phone,
        password,
        address,
        preferredLanguage: 'en',
      });
      dispatch(setCredentials({
        token: response.data.accessToken,
        customerId: response.data.customerId,
        fullName: response.data.fullName,
      }));
      resetAndClose();
    } catch (err) {
      if (err.response?.status === 409) {
        setErrorMsg('This number is already registered — try logging in instead.');
      } else {
        setErrorMsg('Please check your details.');
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ position: 'fixed', inset: 0, background: 'rgba(20,6,6,.6)', zIndex: 110 }}
      onClick={resetAndClose}
    >
      <div
        className="bg-white p-4 rounded"
        style={{ maxWidth: 420, width: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>My Account</h3>
          <button className="btn-close" onClick={resetAndClose}></button>
        </div>

        {/* ===== Tabs ===== */}
        <div className="d-flex mb-3" style={{ borderBottom: '1px solid var(--line)' }}>
          <button
            type="button"
            className="btn flex-fill"
            style={{
              borderRadius: 0,
              borderBottom: activeTab === 'login' ? '3px solid var(--maroon-800)' : '3px solid transparent',
              color: activeTab === 'login' ? 'var(--maroon-800)' : '#999',
              fontWeight: 700,
            }}
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
          >
            Login
          </button>
          <button
            type="button"
            className="btn flex-fill"
            style={{
              borderRadius: 0,
              borderBottom: activeTab === 'signup' ? '3px solid var(--maroon-800)' : '3px solid transparent',
              color: activeTab === 'signup' ? 'var(--maroon-800)' : '#999',
              fontWeight: 700,
            }}
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
          >
            New Account
          </button>
        </div>

        {/* ===== Login form ===== */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {errorMsg && <p className="text-danger">{errorMsg}</p>}

            <button type="submit" className="btn w-100" style={{ backgroundColor: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 700 }}>
              Login
            </button>
          </form>
        )}

        {/* ===== Signup form ===== */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input className="form-control" placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Delivery address (optional)</label>
              <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            {errorMsg && <p className="text-danger">{errorMsg}</p>}

            <button type="submit" className="btn w-100" style={{ backgroundColor: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 700 }}>
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;