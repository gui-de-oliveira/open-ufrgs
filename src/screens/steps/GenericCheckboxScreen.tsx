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
  const isGroupDisabled = (group: T) => {
    if (isDisabled === undefined) return false;
    return isDisabled(group);
  };

  const validGroups = groups.filter((group) => !isGroupDisabled(group));
  const isValidGroupsSelected = selectedIndexes.length === validGroups.length;

  return (
    <div className="container">
      <h3>{header}</h3>
      <Checkbox
        label={
          <Badge
            text={!isValidGroupsSelected ? "Marcar todos" : "Desmarcar todos"}
            badgeStyle="primary"
          />
        }
        isSelected={isValidGroupsSelected}
        onSelect={() =>
          updateSelectedIndexes(validGroups.map((_, index) => index))
        }
        onDeselect={() => updateSelectedIndexes([])}
      />
      {groups.map((placeGroup, index) => (
        <Checkbox
          key={index}
          label={label(placeGroup, isGroupDisabled(placeGroup))}
          isDisabled={isGroupDisabled(placeGroup)}
          isSelected={selectedIndexes.includes(index)}
          onSelect={() => updateSelectedIndexes([...selectedIndexes, index])}
          onDeselect={() =>
            updateSelectedIndexes(
              selectedIndexes.filter((selectedId) => selectedId !== index)
            )
          }
        />
      ))}
      <br />
      <PrimaryButton
        onClick={() => onReturn?.()}
        isDisabled={onReturn === undefined}
        text="Voltar"
      />{" "}
      <PrimaryButton
        onClick={() => {
          const selectedValues = selectedIndexes.map(
            (selectedId) => groups[selectedId]
          );

          onCompleted(selectedValues);
        }}
        isDisabled={selectedIndexes.length === 0}
        text="Avançar"
      />
    </div>
  );
}
