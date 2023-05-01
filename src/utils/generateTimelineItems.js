import {HOURS_IN_DAY, MIDNIGHT_HOUR} from "@/constans";

export const generateTimelineItems = () => {
  const timelineItems = []

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour += 1) {
    timelineItems.push({
      hour,
    })
  }

  return timelineItems
}
