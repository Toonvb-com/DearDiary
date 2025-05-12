import './NoteInput.scss';

export default function NoteInput({ placeholder, value, onChange }) {
  return (
    <div className="note-input">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
