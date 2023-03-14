import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endUserSessionTh } from '../../store/authReducer/actions';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endUserSessionTh(navigate));
  }, []);

  return (
    <div>Logging out</div>
  );
}
