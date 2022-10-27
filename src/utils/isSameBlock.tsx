import { Block, TurmaExtended } from "../screens/steps/BlocksDisplay";

export function isSameBlock(blockA: Block, blockB: Block) {
  if (blockA.length !== blockB.length) return false;

  function sortBlock(a: TurmaExtended, b: TurmaExtended) {
    if (a.class !== b.class) return a.class.nome.localeCompare(b.class.nome);
    return a.label.localeCompare(b.label);
  }

  const sortedBlockA = blockA.sort(sortBlock);
  const sortedBlockB = blockB.sort(sortBlock);

  return sortedBlockA.every(
    (element, index) =>
      element.class === sortedBlockB[index].class &&
      element.label === sortedBlockB[index].label
  );
}
