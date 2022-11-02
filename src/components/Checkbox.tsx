import { ReactNode, useEffect, useMemo, useRef } from "react";

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
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = isSelected;
    }
  }, [isSelected]);

  const elementId = useMemo(() => {
    const randomId = Math.random().toString();
    return randomId;
  }, []);

  return (
    <div className="form-check">
      <input
        ref={ref}
        className="form-check-input"
        type="checkbox"
        id={elementId}
        defaultChecked={isSelected}
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
