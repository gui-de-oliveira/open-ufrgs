import { useMemo } from "react";
import { Class, Turma } from "../../api/getAvailableClasses";
import { deduplicate } from "../../utils/deduplicate";
import { getBlocks } from "../../utils/getBlocks";

export type TurmaExtended = Turma & { class: Class };
export type Block = TurmaExtended[];

export function BlocksDisplay({ classes }: { classes: Class[] }) {
  const blocks = useMemo(() => getBlocks(classes), [classes]);

  if (blocks.length === 0) {
    return <div className="container">Nenhum bloco possível</div>;
  }

  const classesList = deduplicate(
    blocks
      .flatMap((b) => b.map((t) => t.class))
      .sort((a, b) => a.nome.toUpperCase().localeCompare(b.nome.toUpperCase()))
  );

  return (
    <table className="table-bordered table-responsive">
      <thead>
        <tr>
          <th scope="col" />
          {classesList.map((c, i) => (
            <th key={i} scope="col">
              {c.nome}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {blocks.map((block, i) => (
          <tr key={i}>
            <th scope="row">Bloco {i + 1}</th>
            {classesList.map((classElement, index) => {
              const turmaFromClass = block.find(
                (turma) => turma.class === classElement
              );
              return (
                <td key={index} className="text-center">
                  {turmaFromClass?.label ?? "-"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
