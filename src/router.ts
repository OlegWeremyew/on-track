import { ref } from 'vue'
import { isPageValid } from '@/validators'
import { TheTimeline, TheActivities, TheProgress } from '@/pages'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'

export const currentPage = ref<string>(normalizePageHash())

export const navigate = (page: string): void => {
  document.body.scrollIntoView()
  currentPage.value = page
}

function normalizePageHash(): string {
  const page = window.location.hash.slice(1)

  if (isPageValid(page)) {
    return page
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}

export const routes = {
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_PROGRESS]: TheProgress,
}
