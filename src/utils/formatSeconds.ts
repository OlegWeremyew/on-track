import { MILLISECONDS_IN_SECOND } from '@/constants'

export const formatSeconds = (seconds: number): string => {
  const data = new Date()

  data.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)

  const utc = data.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

export const formatSecondsWithSign = (seconds: number): string => {
  return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`
}
