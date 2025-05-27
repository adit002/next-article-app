export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date
    .toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '')
    .replace('at', '')
}
