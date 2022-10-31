export function compare(stringA: string, stringB: string) {
  const normalizedStringA = stringA.toUpperCase();
  const normalizedStringB = stringB.toUpperCase();
  return normalizedStringA.localeCompare(normalizedStringB);
}
