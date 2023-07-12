import { ref } from 'vue'
import { normalizePageHash } from '@/utils/normalizePageHash'
import { PAGE_TIMELINE } from '@/constants'

export const currentPage = ref(normalizePageHash())
export const timelineRef = ref()

export const navigate = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value.scrollToHour()
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }

  currentPage.value = page
}
