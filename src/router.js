import { ref } from 'vue'
import { isPageValid } from '@/validators'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'

export const currentPage = ref(normalizePageHash())

export const navigate = (page) => {
  document.body.scrollIntoView()
  currentPage.value = page
}

function normalizePageHash() {
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
