export function Checkbox({
  label,
  isSelected,
  onSelect,
  onDeselect,
}: {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={label}
        checked={isSelected}
        onClick={!isSelected ? onSelect : onDeselect}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
