import { ReactNode } from "react";
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
      {groups.map((placeGroup, index) => {
        const disabled =
          isDisabled === undefined ? false : isDisabled(placeGroup);

        return (
          <Checkbox
            key={index}
            label={label(placeGroup, disabled)}
            isDisabled={disabled}
            isSelected={(() => {
              return selectedIndexes.includes(index);
            })()}
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
      {!isAllSelected ? (
        <PrimaryButton
          onClick={() => updateSelectedIndexes(groups.map((_, index) => index))}
          text="Marcar todos"
        />
      ) : (
        <PrimaryButton
          onClick={() => updateSelectedIndexes([])}
          text="Desmarcar todos"
        />
      )}{" "}
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
