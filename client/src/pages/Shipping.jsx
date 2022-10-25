import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Shipping = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.contactData);
  }, [location]);
  return <div>Shipping</div>;
};

export default Shipping;
