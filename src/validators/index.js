import { BUTTON_TYPES, HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS, ICONS } from "@/constants"

export const isPageValid = (page) => {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
}
export const isIconValid = (icon) => {
  return Object.keys(ICONS).includes(icon)
}

export const isNavItemValid = (navItem) => {
  return NAV_ITEMS.includes(navItem)
}

const isSelectOptionsValid = ({ value, label }) => {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

export const isUndefinedOrNull = (select) => {
  return isUndefined(select) || isNull(select)
}

export const isNumberOrNull = (value) => {
  return isNumber(value) || isNull(value)
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

export const isActivityValid = ({ id, name, secondsToComplete }) => {
  if (isNull(id)) return true

  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export const isButtonTypeValid = (type) => {
  return BUTTON_TYPES.includes(type)
}

export const isUndefined = (value) => {
  return value === undefined
}

export const isNull = (value) => {
  return value === null
}

export const isNumber = (value) => {
  return typeof value === "number"
}

export const isString = (value) => {
  return typeof value === "string"
}

export const isSelectValueValid = (value) => {
  return isNumberOrNull(value) || isNotEmptyString(value)
}

const isBetween = (value, start, end) => {
  return value >= start && value <= end
}

const isNotEmptyString = (value) => {
  return isString(value) && value.length > 0
}
