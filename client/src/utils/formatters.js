// utils/formatters.js — shared formatting helpers
export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
