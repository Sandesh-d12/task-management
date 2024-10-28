// src/components/WithMarginTop.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className='mt-20 p-10'>
      {children}
    </div>
  );
};

export default Layout;
