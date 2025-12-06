import React from 'react';
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';
import './App.css/../index.css'; // Asegurando styles

function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <ContentWrapper />
    </div>
  );
}

export default App;
