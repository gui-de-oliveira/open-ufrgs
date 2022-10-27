import { useEffect, useRef } from "react";

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
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = isSelected;
    }
  }, [isSelected]);

  return (
    <div className="form-check">
      <input
        ref={ref}
        className="form-check-input"
        type="checkbox"
        id={label}
        defaultChecked={isSelected}
        onChange={(ev) => {
          const isChecked = ev.target.checked;
          const callback = isChecked ? onSelect : onDeselect;
          callback();
        }}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
