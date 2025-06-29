import { useEffect, useState } from 'react';
import WelcomePopup from './components/WelcomePopup.jsx';
import Home from './pages/Home';
import EntryForm from './pages/EntryForm';
import './app.scss';
import { CheckDevmode } from './utils/Devmode';

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [view, setView] = useState('home');

  const handleImport = () => {
    setShowPopup(false);
  };

  const handleTutorial = () => {
    alert("Tutorial will start (functionality coming soon)");
    setShowPopup(false);
  };

  const handleSkip = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    CheckDevmode();
  }, []);

  const renderContent = () => {
    if (showPopup) {
      return (
        <WelcomePopup
          onImport={handleImport}
          onTutorial={handleTutorial}
          onSkip={handleSkip}
        />
      );
    }

    switch (view) {
      case 'entry':
        return <EntryForm onBack={() => setView('home')} />;
      case 'home':
      default:
        return (
          <Home
            onAddEntry={() => setView('entry')}
            onViewEntries={() => alert('Not built yet')}
          />
        );
    }
  };

  return <div>{renderContent()}</div>;
}

export default App;
