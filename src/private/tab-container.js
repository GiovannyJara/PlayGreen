import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import homeImage from '../assets/img/home.png';
import historyImage from '../assets/img/history.png';
import logoutImage from '../assets/img/logout.png';


import { auth } from '../public/firebase/firebase';

const TabContainerWrapper = styled.div`
  position: fixed;
  width: 347px;
  height: 85px;
  left: 21px;
  bottom: 21px;
  background: #2C2B3E;
  border-radius: 24px;
`;

const TabContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  height: 100%;
`;

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const handleLogout = (navigate) => {
  auth
    .signOut()
    .then(() => {
      // Cierre de sesión exitoso, redirigir a la vista de login.
      localStorage.clear();
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
    });
};

const TabContainer = () => {
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    if (path === '/logout') {
      handleLogout(navigate);
    } else {
      navigate(path);
    }
  };

  return (
    <TabContainerWrapper>
      <TabContent>
        <TabButton onClick={() => handleTabClick('/sport')}>
          <img src={homeImage} alt="Button 1" />
        </TabButton>
        <TabButton onClick={() => handleTabClick('/history')}>
          <img src={historyImage} alt="Button 2" />
        </TabButton>
        <TabButton onClick={() => handleTabClick('/logout')}>
          <img src={logoutImage} alt="Button 3" />
        </TabButton>
      </TabContent>
    </TabContainerWrapper>
  );
};

export default TabContainer;
