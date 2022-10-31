import { Class } from "../api/getAvailableClasses";
import { TurmaExtended } from "../screens/steps/BlocksDisplay";

export function groupTurmasInClasses(turmas: TurmaExtended[]): Class[] {
  return turmas.reduce((selectedClasses, turmaInsideTimeframe) => {
    const selectedClass = selectedClasses.find(
      (c) => c.nome === turmaInsideTimeframe.class.nome
    );

    if (selectedClass === undefined) {
      selectedClasses.push({
        ...turmaInsideTimeframe.class,
        turmas: [turmaInsideTimeframe],
      });
    } else {
      selectedClass.turmas.push(turmaInsideTimeframe);
    }

    return selectedClasses;
  }, [] as Class[]);
}
