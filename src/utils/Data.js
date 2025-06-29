const STORAGE_KEY = 'diaryEntries';
const LAST_USED_DATE_KEY = 'lastUsedDate';

// Get all entries
export const getAllEntries = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

// Get single entry by date (YYYY-MM-DD)
export const getEntryByDate = (date) => {
  const entries = getAllEntries();
  return entries[date] || null;
};

// Save or update an entry
export const saveEntry = (date, entryData) => {
  const entries = getAllEntries();
  entries[date] = entryData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  saveLastUsedDate(date); // Save date after saving entry
};

// Delete a single entry
export const deleteEntry = (date) => {
  const entries = getAllEntries();
  delete entries[date];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// Clear all entries
export const clearAllEntries = () => {
  localStorage.removeItem(STORAGE_KEY);
  clearLastUsedDate(); // Also clear stored date
};

// Export Data to JSON
export const exportEntriesAsJSON = () => {
  const data = getAllEntries();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'deardiary_backup.json';
  link.click();
};

// Import Data from JSON File
export const importEntriesFromJSON = (file, onSuccess, onError) => {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        onSuccess && onSuccess();
      } else {
        throw new Error('Invalid format');
      }
    } catch (error) {
      onError && onError(error);
    }
  };
  reader.readAsText(file);
};

// --- Last Used Date Helpers ---

// Save the last used date (YYYY-MM-DD)
export const saveLastUsedDate = (date) => {
  localStorage.setItem(LAST_USED_DATE_KEY, date);
};

// Get the last used date
export const getLastUsedDate = () => {
  return localStorage.getItem(LAST_USED_DATE_KEY);
};

// Clear the last used date
export const clearLastUsedDate = () => {
  localStorage.removeItem(LAST_USED_DATE_KEY);
};
