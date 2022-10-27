import { useMemo } from "react";
import { Class } from "../../api/getAvailableClasses";
import { groupBy } from "../../utils/groupBy";
import { GenericCheckboxScreen } from "./GenericCheckboxScreen";

export function FilterClasseByName({
  onCompleted,
  classes,
}: {
  classes: Class[];
  onCompleted: (selectedClasses: Class[]) => void;
}) {
  const groups = useMemo(
    () =>
      groupBy(classes, ({ nome }) => nome).sort((a, b) =>
        a.id.localeCompare(b.id)
      ),
    []
  );

  return (
    <GenericCheckboxScreen
      groups={groups}
      header={"Selecione que cadeiras deseja fazer esse semestre:"}
      label={(placeGroup) => placeGroup.id}
      onCompleted={(selectedGroups) => {
        const selectedClasses = selectedGroups.flatMap(
          (group) => group.elements
        );
        onCompleted(selectedClasses);
      }}
    />
  );
}
