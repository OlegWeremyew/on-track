import { isNull } from "@/validators"

export const normalizeSelectValue = (value) => {
  return isNull(value) || isNaN(value) ? value : +value
}
