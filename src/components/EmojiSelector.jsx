import './EmojiSelector.scss';

export default function EmojiSelector({ title, selected, onSelect, emojis = ['😄', '🙂', '😐', '😞', '😡'] }) {
  return (
    <section className="emoji-selector">
      <h3>{title}</h3>
      <div>
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className={selected === emoji ? 'selected' : ''}
          >
            {emoji}
          </button>
        ))}
      </div>
    </section>
  );
}
