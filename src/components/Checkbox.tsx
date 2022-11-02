import { ReactNode, useMemo } from "react";

export function Checkbox({
  label,
  isSelected,
  onSelect,
  onDeselect,
}: {
  label: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  const elementId = useMemo(() => {
    const randomId = Math.random().toString();
    return randomId;
  }, []);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={elementId}
        checked={isSelected}
        onChange={(ev) => {
          const isChecked = ev.target.checked;
          const callback = isChecked ? onSelect : onDeselect;
          callback();
        }}
      />
      <label className="form-check-label" htmlFor={elementId}>
        {label}
      </label>
    </div>
  );
}
