export function normalizeDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.toLocaleString('default', {
    month: 'long'
  })} ${date.getDate()}, ${date.getFullYear()}`;
}
