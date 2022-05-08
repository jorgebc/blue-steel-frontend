const toLocalDateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export function toLocalDateTime(date: string) {
  return new Date(date).toLocaleDateString('es-ES', toLocalDateTimeOptions)
}
