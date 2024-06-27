export const rippleEpochToISO = (rippleEpoch: number): string => {
  return new Date(rippleEpoch + 946684800 * 1000).toISOString().replace(/\.[0-9]{3}/, '')
}
