import { HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from '@/constans'

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const validateTimelineItems = (timelineItems) => {
  return timelineItems.every(isTimelineItemValid)
}

export const isTimelineItemValid = ({ hour }) => {
  return typeof hour === 'number' && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
}

export const validateSelectOptions = (options) => {
  return options.every(isSelectOptionsValid)
}

const isSelectOptionsValid = ({ value, label }) => {
  return typeof value === 'number' && typeof label === 'string'
}
