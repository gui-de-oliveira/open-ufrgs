import { ReactNode, useState } from "react";
import { Checkbox } from "../../components/Checkbox";
import { PrimaryButton } from "../../components/PrimaryButton";

export function GenericCheckboxScreen<T>({
  header,
  groups,
  onCompleted,
  label,
  onReturn,
}: {
  header: string;
  groups: T[];
  label: (element: T) => ReactNode;
  onCompleted: (selectedGroups: T[]) => void;
  onReturn?: () => void;
}) {
  const [selectedGroups, setSelectedGroups] = useState<T[]>([]);
  const isAllSelected = selectedGroups.length === groups.length;

  return (
    <div className="container">
      <h3>{header}</h3>
      {groups.map((placeGroup, i) => (
        <Checkbox
          key={i}
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
      {onReturn && <PrimaryButton onClick={onReturn} text="Voltar" />}
    </div>
  );
}
