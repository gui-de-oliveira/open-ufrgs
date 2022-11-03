import { ReactNode, useMemo } from "react";

export function Checkbox({
  label,
  isSelected,
  onSelect,
  onDeselect,
  isDisabled,
}: {
  label: ReactNode;
  isDisabled?: boolean;
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
        disabled={isDisabled === undefined ? false : isDisabled}
        onChange={(ev) => {
          const isChecked = ev.target.checked;
          const callback = isChecked ? onSelect : onDeselect;
          callback();
        }}
      />
      <label
        className="form-check-label"
        htmlFor={elementId}
        style={{ width: "100%", cursor: "pointer" }}
      >
        {label}
      </label>
    </div>
  );
}
