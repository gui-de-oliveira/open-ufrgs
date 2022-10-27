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
    <div className="container">
      <h3>Blocos</h3>
      <table className="table table-bordered table-responsive align-middle">
        <thead>
          <tr>
            <th scope="col" />
            {blocks.map((_c, i) => (
              <th className="text-center" key={i} scope="col">
                B{i <= 9 ? "0" : ""}
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classesList.map((classElement, i) => (
            <tr key={i}>
              <th scope="row">{classElement.nome}</th>
              {blocks.map((block, index) => {
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
    </div>
  );
}
