import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
  const count = useSelector((state) => state.favorites.likeCounter);

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, count]);

  return <>{count > 0 && <span className="dot">{count}</span>}</>;
};

export default Notification;
