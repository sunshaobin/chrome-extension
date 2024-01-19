import React from 'react';
import './Page.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
      <button id="openSidePanel" onClick={() => {
        chrome.runtime.sendMessage({ action: 'open_side_panel' })
      }}>Open side panel</button>
      </header>
    </div>
  );
};

export default Popup;
