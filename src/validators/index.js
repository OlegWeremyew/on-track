import { BUTTON_TYPES, HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from '@/constans'

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page)
}

const isSelectOptionsValid = ({ value, label }) => {
  return isNumber(value) && isString(label)
}

export const isUndefinedOrNull = (select) => {
  return isUndefined(select) || isNull(select)
}

export const isNumberOrNull = (value) => {
  return isNumber(value) || isNull(value)
}

export const validateTimelineItems = (timelineItems) => {
  return timelineItems.every(isTimelineItemValid)
}

export const isTimelineItemValid = ({ hour }) => {
  return isHourValid(hour)
}

export const validateSelectOptions = (options) => {
  return options.every(isSelectOptionsValid)
}

export const isHourValid = (hour) => {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY)
}

export const validateActivities = (activities) => {
  return activities.every(isActivityValid)
}

export const isActivityValid = (activity) => {
  return isNotEmptyString(activity)
}

export const isButtonTypeValid = (type) => {
  return BUTTON_TYPES.includes(type)
}

const isNull = (value) => {
  return value === null
}

const isUndefined = (value) => {
  return value === undefined
}

const isNumber = (value) => {
  return typeof value === 'number'
}

const isBetween = (value, start, end) => {
  return value >= start && value <= end
}

const isString = (value) => {
  return typeof value === 'string'
}

const isNotEmptyString = (value) => {
  return isString(value) && value.length > 0
}
