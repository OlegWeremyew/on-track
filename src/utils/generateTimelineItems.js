import {HOURS_IN_DAY} from "@/constans";

export const generateTimelineItems = () => {
  const timelineItems = []

  for (let hour = 0; hour < HOURS_IN_DAY; hour += 1) {
    timelineItems.push({
      hour,
    })
  }

  return timelineItems
}
