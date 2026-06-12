import React, { useState } from 'react';
import BootScreen from './components/BootScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  return (
    <>
      {/* Global Retro Sci-Fi overlays */}
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Conditional mount depending on boot status */}
      {!isBooted ? (
        <BootScreen onBootComplete={handleBootComplete} />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
