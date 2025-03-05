/**
 * Formats a date string into a human-readable format using the en-ZA locale (South Africa)
 * @param dateStr - The date string to format
 * @returns The formatted date string
 */
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-ZA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a timestamp into a human-readable time string using the en-ZA locale (South Africa)
 * @param timestamp - The timestamp to format
 * @returns The formatted time string
 */
export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
