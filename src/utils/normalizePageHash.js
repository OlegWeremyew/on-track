import {PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE} from "@/constans";

export function normalizePageHash() {
  const hash = window.location.hash.slice(1)
  if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash)) {
    return hash
  }

  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
