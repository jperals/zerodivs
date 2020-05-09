export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
