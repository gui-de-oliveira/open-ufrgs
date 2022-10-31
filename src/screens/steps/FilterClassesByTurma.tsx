import { useMemo } from "react";
import { Class } from "../../api/getAvailableClasses";
import { groupBy } from "../../utils/groupBy";
import { TurmaExtended } from "./BlocksDisplay";
import { compare } from "../../utils/compare";
import { GenericCheckboxScreen } from "./GenericCheckboxScreen";
import { groupTurmasInClasses } from "../../utils/groupTurmasInClasses";

export function FilterClassesByTurma({
  classes,
  onCompleted,
}: {
  classes: Class[];
  onCompleted: (selectedClasses: Class[]) => void;
}) {
  const turmas = useMemo(
    () =>
      classes.flatMap((c) =>
        c.turmas.map((turma): TurmaExtended => ({ class: c, ...turma }))
      ),
    [classes]
  );

  const groups = useMemo(
    () =>
      groupBy(
        turmas,
        (turma) => turma,
        (turmaA, turmaB) =>
          turmaA.label === turmaB.label &&
          turmaA.class.nome === turmaB.class.nome
      ).sort(({ id: idA }, { id: idB }) => {
        if (idA.class.nome !== idB.class.nome) {
          return compare(idA.class.nome, idB.class.nome);
        }

        return compare(idA.label, idB.label);
      }),
    [turmas]
  );

  return (
    <GenericCheckboxScreen
      groups={groups}
      header={"Selecione que turmas deseja fazer esse semestre:"}
      label={(turma) =>
        `${turma.id.class.nome} - ${
          turma.id.label
        } - Professores: [${turma.id.professors.join()}] - Horários: [${turma.id.places
          .map(
            (place) =>
              `${place.weekDay} das ${place.startTime} às ${place.endTime}${
                place.place === null ? "" : `Em ${place.place}`
              }`
          )
          .join()}] - Número de vagas: ${turma.id.vagas}`
      }
      onCompleted={(selectedGroups) => {
        const selectedTurmas = selectedGroups.map((g) => g.id);
        const selectedClasses = groupTurmasInClasses(selectedTurmas);
        onCompleted(selectedClasses);
      }}
    />
  );
}
