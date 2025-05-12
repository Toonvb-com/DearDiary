import './ConditionalSection.scss';

export default function ConditionalSection({ label, checked, onCheck, children }) {
  return (
    <section className="conditional-section">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheck(e.target.checked)}
        />
        {label}
      </label>
      {checked && <div>{children}</div>}
    </section>
  );
}
