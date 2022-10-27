import { useState } from "react";
import { Checkbox } from "../../utils/Checkbox";
import { PrimaryButton } from "../../utils/PrimaryButton";

export function GenericCheckboxScreen<T>({
  header,
  groups,
  onCompleted,
  label,
}: {
  header: string;
  groups: T[];
  label: (element: T) => string;
  onCompleted: (selectedGroups: T[]) => void;
}) {
  const [selectedGroups, setSelectedGroups] = useState<T[]>([]);
  const isAllSelected = selectedGroups.length === groups.length;

  return (
    <div className="container">
      <h3>{header}</h3>
      {groups.map((placeGroup) => (
        <Checkbox
          label={label(placeGroup)}
          isSelected={selectedGroups.includes(placeGroup)}
          onSelect={() => setSelectedGroups([...selectedGroups, placeGroup])}
          onDeselect={() =>
            setSelectedGroups(
              selectedGroups.filter((selectedId) => selectedId !== placeGroup)
            )
          }
        />
      ))}
      <br />
      {!isAllSelected ? (
        <PrimaryButton
          onClick={() => setSelectedGroups([...groups])}
          text="Marcar todos"
        />
      ) : (
        <PrimaryButton
          onClick={() => setSelectedGroups([])}
          text="Desmarcar todos"
        />
      )}{" "}
      <PrimaryButton
        onClick={() => onCompleted(selectedGroups)}
        text="Confirmar"
      />
    </div>
  );
}
