export const generateActivitiesSelectOptions = (activities) => {
  return activities.map((label, value) => ({
    label,
    value,
  }))
}
