import React from 'react';
import Main from './Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './Details';
import { useSelector } from 'react-redux';

function PageRoute() {
  const oompas = useSelector((state) => state.setOompas);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Details oompas={oompas} />} />
      </Routes>
    </Router>
  );
}

export default PageRoute;
