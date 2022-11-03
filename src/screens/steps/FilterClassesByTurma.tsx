import { useMemo } from "react";
import { Class } from "../../api/getAvailableClasses";
import { groupBy } from "../../utils/groupBy";
import { TurmaExtended } from "./BlocksDisplay";
import { compare } from "../../utils/compare";
import { GenericCheckboxScreen } from "./GenericCheckboxScreen";
import { groupTurmasInClasses } from "../../utils/groupTurmasInClasses";
import { Badge } from "../../components/Badge";
import React from "react";

export function FilterClassesByTurma({
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
      selectedIndexes={selectedIndexes}
      updateSelectedIndexes={updateSelectedIndexes}
      header={"Selecione que turmas deseja fazer esse semestre:"}
      label={(turma) => (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{turma.id.class.nome}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Turma {turma.id.label} - {turma.id.vagas} vagas
              </h6>

              {turma.id.professors.map((professor, i) => (
                <React.Fragment key={i}>
                  <Badge text={professor} />{" "}
                </React.Fragment>
              ))}
              <br />

              {turma.id.places.map((place, i) => (
                <React.Fragment key={i}>
                  <Badge text={place.weekDay} badgeStyle="info" />{" "}
                  <Badge text={`${place.startTime} às ${place.endTime}`} />{" "}
                  {place.place !== null && (
                    <Badge text={`Em ${place.place}`} badgeStyle="secondary" />
                  )}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <br />
        </>
      )}
      onCompleted={(selectedGroups) => {
        const selectedTurmas = selectedGroups.map((g) => g.id);
        const selectedClasses = groupTurmasInClasses(selectedTurmas);
        onCompleted(selectedClasses);
      }}
      onReturn={onReturn}
    />
  );
}
