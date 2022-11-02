import { useMemo } from "react";
import { Class } from "../../api/getAvailableClasses";
import { compare } from "../../utils/compare";
import { groupBy } from "../../utils/groupBy";
import { Badge } from "../../components/Badge";
import { GenericCheckboxScreen } from "./GenericCheckboxScreen";

export function FilterClasseByName({
  onCompleted,
  classes,
}: {
  classes: Class[];
  onCompleted: (selectedClasses: Class[]) => void;
}) {
  function orderByRelevancy(classA: Class, classB: Class): number {
    if (classA.etapa !== classB.etapa) {
      return Number(classA.etapa) - Number(classB.etapa);
    }

    if (classA.carater !== classB.carater) {
      const score = ["OBRIGATÓRIA", "ELETIVA", "ADICIONAL"] as const;

      const scoreA = score.findIndex((c) => c === classA.carater.toUpperCase());
      const scoreB = score.findIndex((c) => c === classB.carater.toUpperCase());

      return scoreB - scoreA;
    }

    return compare(classA.nome, classB.nome);
  }
  const groups = useMemo(
    () =>
      groupBy(classes, (c) => c).sort((a, b) => orderByRelevancy(a.id, b.id)),
    [classes]
  );

  return (
    <GenericCheckboxScreen
      groups={groups}
      header={"Selecione que cadeiras deseja fazer esse semestre:"}
      label={(placeGroup) => {
        const { nome, etapa, carater } = placeGroup.id;
        return (
          <>
            <Badge text={`Etapa ${etapa}`} />{" "}
            <Badge text={carater} badgeStyle={"secondary"} /> {nome}
          </>
        );
      }}
      onCompleted={(selectedGroups) => {
        const selectedClasses = selectedGroups.flatMap(
          (group) => group.elements
        );
        onCompleted(selectedClasses);
      }}
    />
  );
}
