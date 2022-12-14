import { useMemo } from "react";
import { Class, TimeAndPlace } from "../../api/getAvailableClasses";
import { groupBy } from "../../utils/groupBy";
import { GenericCheckboxScreen } from "./GenericCheckboxScreen";
import { groupTurmasInClasses } from "../../utils/groupTurmasInClasses";
import { Badge } from "../../components/Badge";

const isSameTime = (placeA: TimeAndPlace, placeB: TimeAndPlace): boolean => {
  return (
    placeA.weekDay === placeB.weekDay &&
    placeA.startTime === placeB.startTime &&
    placeA.endTime === placeB.endTime
  );
};

export function FilterClassesByTime({
  classes,
  onCompleted,
  onReturn,
  selectedIndexes,
  updateSelectedIndexes,
}: {
  selectedIndexes: number[];
  updateSelectedIndexes: (updated: number[]) => void;
  classes: Class[];
  onCompleted: (selectedClasses: Class[]) => void;
  onReturn: () => void;
}) {
  const places = useMemo(
    () =>
      classes
        .flatMap((c) => c.turmas.map((turma) => ({ class: c, ...turma })))
        .flatMap((turma) => turma.places.map((place) => ({ ...place, turma }))),
    [classes]
  );

  const groups = useMemo(
    () =>
      groupBy(
        places,
        ({ weekDay, startTime, endTime, place }) => ({
          weekDay,
          startTime,
          endTime,
          place,
        }),
        isSameTime
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
    [places]
  );

  return (
    <GenericCheckboxScreen
      groups={groups}
      selectedIndexes={selectedIndexes}
      updateSelectedIndexes={updateSelectedIndexes}
      header={"Selecione que horários deseja fazer esse semestre:"}
      label={(placeGroup) => (
        <>
          <Badge text={placeGroup.id.weekDay} badgeStyle="info" />{" "}
          <Badge
            text={`${placeGroup.id.startTime} às ${placeGroup.id.endTime}`}
          />
        </>
      )}
      onReturn={onReturn}
      onCompleted={(selectedGroups) => {
        const turmas = classes.flatMap((c) =>
          c.turmas.map((t) => ({ ...t, class: c }))
        );

        const turmasInsideTimeframe = turmas.filter((turma) => {
          const timeOutsideSelectedTimeFrame = turma.places.find((time) => {
            const isTimeSelected = !!selectedGroups.find((group) =>
              isSameTime(group.id, time)
            );
            return !isTimeSelected;
          });

          const isTurmaInsideTimeFrame =
            timeOutsideSelectedTimeFrame === undefined;

          return isTurmaInsideTimeFrame;
        });

        const selectedClasses = groupTurmasInClasses(turmasInsideTimeframe);

        onCompleted(selectedClasses);
      }}
    />
  );
}
