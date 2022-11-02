import { ReactNode } from "react";
import { Badge } from "../../components/Badge";
import { Checkbox } from "../../components/Checkbox";
import { PrimaryButton } from "../../components/PrimaryButton";

export function GenericCheckboxScreen<T>({
  header,
  groups,
  onCompleted,
  label,
  onReturn,
  selectedIndexes,
  updateSelectedIndexes,
  isDisabled,
}: {
  header: string;
  groups: T[];
  label: (element: T, isDisabled: boolean) => ReactNode;
  isDisabled?: (element: T) => boolean;
  onCompleted: (selectedGroups: T[]) => void;
  onReturn?: () => void;
  selectedIndexes: number[];
  updateSelectedIndexes: (updated: number[]) => void;
}) {
  const isAllSelected = selectedIndexes.length === groups.length;

  return (
    <div className="container">
      <h3>{header}</h3>
      <Checkbox
        label={
          <Badge
            text={!isAllSelected ? "Marcar todos" : "Desmarcar todos"}
            badgeStyle="primary"
          />
        }
        isSelected={isAllSelected}
        onSelect={() => updateSelectedIndexes(groups.map((_, index) => index))}
        onDeselect={() => updateSelectedIndexes([])}
      />
      {groups.map((placeGroup, index) => {
        const disabled =
          isDisabled === undefined ? false : isDisabled(placeGroup);

        return (
          <Checkbox
            key={index}
            label={label(placeGroup, disabled)}
            isDisabled={disabled}
            isSelected={selectedIndexes.includes(index)}
            onSelect={() => updateSelectedIndexes([...selectedIndexes, index])}
            onDeselect={() =>
              updateSelectedIndexes(
                selectedIndexes.filter((selectedId) => selectedId !== index)
              )
            }
          />
        );
      })}
      <br />
      <PrimaryButton
        onClick={() => {
          const selectedValues = selectedIndexes.map(
            (selectedId) => groups[selectedId]
          );
          onCompleted(selectedValues);
        }}
        text="Confirmar"
      />
      {onReturn && <PrimaryButton onClick={onReturn} text="Voltar" />}
    </div>
  );
}
