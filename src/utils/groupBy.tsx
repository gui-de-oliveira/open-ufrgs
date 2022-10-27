export function groupBy<T, Id>(
  array: T[],
  getId: (element: T) => Id,
  customCompare?: (elementA: Id, elementB: Id) => boolean
): Group<Id, T>[] {
  const groups = array.reduce((previousValue, element) => {
    const id = getId(element);

    const compare = (elementA: Id, elementB: Id) =>
      customCompare?.(elementA, elementB) ?? elementA === elementB;

    const group = previousValue.find((e) => compare(e.id, id));

    if (group !== undefined) {
      group.elements.push(element);
    } else {
      previousValue.push({ id, elements: [element] });
    }

    return previousValue;
  }, [] as Group<Id, T>[]);

  return groups;
}
type Group<Id, Element> = { id: Id; elements: Element[] };
