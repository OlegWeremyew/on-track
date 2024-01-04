import { BUTTON_TYPES, HOURS_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS, ICONS } from "@/constants"
import type { NavItemType, SelectOptionType } from '@/types'

export const isPageValid = (page: string): boolean => {
  return NAV_ITEMS.some((navItem: NavItemType) => navItem.page === page)
}
export const isIconValid = (icon: string): boolean => {
  return Object.keys(ICONS).includes(icon)
}

export const isNavItemValid = (navItem: NavItemType): boolean => {
  return NAV_ITEMS.includes(navItem)
}

const isSelectOptionsValid = ({ value, label }: SelectOptionType): boolean => {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

export const isUndefinedOrNull = (select: unknown): boolean => {
  return isUndefined(select) || isNull(select)
}

export const isNumberOrNull = (value: unknown): boolean => {
  return isNumber(value) || isNull(value)
}

export const isTimelineItemValid = ({ hour }: {hour: string}) => {
  return isHourValid(hour)
}

export const validateSelectOptions = (options: any[]): boolean => {
  return options.every(isSelectOptionsValid)
}

export const isHourValid = (hour: any): boolean => {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY)
}

export const isActivityValid = ({ id, name, secondsToComplete }: any): boolean => {
  if (isNull(id)) return true

  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export const isButtonTypeValid = (type: string): boolean => {
  return BUTTON_TYPES.includes(type)
}

export const isUndefined = (value: unknown): boolean => {
  return value === undefined
}

export const isNull = (value: unknown): boolean => {
  return value === null
}

export const isNumber = (value: unknown): boolean => {
  return typeof value === "number"
}

export const isString = (value: unknown): boolean => {
  return typeof value === "string"
}

export const isSelectValueValid = (value: unknown): boolean => {
  return isNumberOrNull(value) || isNotEmptyString(value)
}

const isBetween = (value: number, start: number, end: number): boolean => {
  return value >= start && value <= end
}

const isNotEmptyString = (value: any): boolean => {
  return isString(value) && value.length > 0
}
