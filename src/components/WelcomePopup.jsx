import { useRef } from 'react';
import { importEntriesFromJSON } from '../utils/Data';
import './WelcomePopup.scss';

export default function WelcomePopup({ onImport, onTutorial, onSkip }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    importEntriesFromJSON(
      file,
      () => {
        alert('Import successful!');
        onImport(); // Proceed after success
      },
      (err) => {
        alert('Import failed: ' + err.message);
      }
    );
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>New user or returning user?</h2>
        <button onClick={() => fileInputRef.current.click()}>Import data...</button>
        <input
          type="file"
          ref={fileInputRef}
          accept="application/json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={onTutorial}>Get a tutorial</button>
        <button onClick={onSkip}>Start without tutorial</button>
      </div>
    </div>
  );
}
