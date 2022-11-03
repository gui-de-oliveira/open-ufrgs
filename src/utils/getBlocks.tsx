import { Class } from "../api/getAvailableClasses";
import { Block, TurmaExtended } from "../screens/steps/BlocksDisplay";
import { hasScheduleConflict } from "./hasScheduledConflict";
import { isSameBlock } from "./isSameBlock";

export function getBlocks(classes: Class[]) {
  const turmas = classes.flatMap((c) =>
    c.turmas.map((turma) => ({ ...turma, class: c }))
  );

  const travelledBlocksRef = { travelledBlocks: [] as Block[] };
  const blocks = getValidBlocks(travelledBlocksRef, [], turmas)
    .sort((a, b) => b.length - a.length)
    .slice(0, 20);

  return blocks;
}

function getValidBlocks(
  travelledBlocksRef: { travelledBlocks: Block[] },
  currentBlock: Block,
  turmas: TurmaExtended[]
): Block[] {
  const isAlreadyTravelled = !!travelledBlocksRef.travelledBlocks.find(
    (travelledBlock) => isSameBlock(travelledBlock, currentBlock)
  );

  if (isAlreadyTravelled) {
    return [];
  }

  travelledBlocksRef.travelledBlocks.push(currentBlock);

  const compatibleTurmas = turmas
    .filter((turma) => {
      const isClassOnBlock = !!currentBlock
        .map((t) => t.class)
        .includes(turma.class);

      return !isClassOnBlock;
    })
    .filter((turma) => {
      const hasConflict = !!currentBlock
        .map((t) => t.places)
        .find((p) => hasScheduleConflict(p, turma.places));

      return !hasConflict;
    });

  if (compatibleTurmas.length === 0) {
    return [currentBlock];
  }

  const blocks = compatibleTurmas.flatMap((turma) =>
    getValidBlocks(travelledBlocksRef, [...currentBlock, turma], turmas)
  );

  return blocks;
}
