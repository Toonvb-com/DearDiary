import { exportEntriesAsJSON } from '../utils/Data';

function Home({ onAddEntry, onViewEntries }) {
  return (
    <>
      <div className="homepage">
        <h1>Welcome to DearDiary 📝</h1>
        <p>Your private space to reflect and track your mental well-being.</p>

        <div className="homepage-buttons">
          <button onClick={onAddEntry}>➕ Add New Entry</button>
          <button onClick={onViewEntries}>📖 View Past Entries</button>
        </div>
      </div>

      <button onClick={exportEntriesAsJSON}>💾 Export Backup</button>
    </>
  );
}

export default Home;