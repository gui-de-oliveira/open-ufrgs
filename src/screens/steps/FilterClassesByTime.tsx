import { useMemo } from "react";
import { Class } from "../../api/getAvailableClasses";
import { groupBy } from "../../utils/groupBy";
import { GenericCheckboxScreen } from "./GenericCheckboxScreen";

export function FilterClassesByTime({
  classes,
  onCompleted,
}: {
  classes: Class[];
  onCompleted: (selectedClasses: Class[]) => void;
}) {
  const places = classes
    .flatMap((c) => c.turmas.map((turma) => ({ class: c, ...turma })))
    .flatMap((turma) => turma.places.map((place) => ({ ...place, turma })));

  const groups = useMemo(
    () =>
      groupBy(
        places,
        ({ weekDay, startTime, endTime }) => ({ weekDay, startTime, endTime }),
        (placeA, placeB) =>
          placeA.weekDay === placeB.weekDay &&
          placeA.startTime === placeB.startTime &&
          placeA.endTime === placeB.endTime
      ).sort(({ id: idA }, { id: idB }) => {
        if (idA.weekDay !== idB.weekDay) {
          const weekDayValue: typeof idA["weekDay"][] = [
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
          ];

          const a = weekDayValue.findIndex((w) => w === idA.weekDay);
          const b = weekDayValue.findIndex((w) => w === idB.weekDay);
          return a - b;
        }

        if (idA.startTime !== idB.startTime) {
          return idA.startTime.localeCompare(idB.startTime);
        }

        return idA.endTime.localeCompare(idB.endTime);
      }),
    []
  );

  return (
    <GenericCheckboxScreen
      groups={groups}
      header={"Selecione que horários deseja fazer esse semestre:"}
      label={(placeGroup) =>
        `${placeGroup.id.weekDay} ${placeGroup.id.startTime} - ${placeGroup.id.endTime}`
      }
      onCompleted={(selectedGroups) => {
        const selectedClasses = selectedGroups.flatMap((group) =>
          group.elements.map((e) => e.turma.class)
        );
        onCompleted(selectedClasses);
      }}
    />
  );
}
