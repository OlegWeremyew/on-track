import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { loadState, saveState } from '@/storage'
import { fidActiveTimelineItem, startTimelineItemTimer } from '@/app-activities'

loadState()

const activeTimelineItem = fidActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}


document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
