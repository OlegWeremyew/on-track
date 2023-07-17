import { ref } from 'vue'
import { PAGE_TIMELINE } from '@/constants'
import { isPageValid } from '@/validators'

export const currentPage = ref(normalizePageHash())
export const timelineRef = ref()

export const navigate = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value.scrollToHour()
  } else {
    document.body.scrollIntoView()
  }
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

