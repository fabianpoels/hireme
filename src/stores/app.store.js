import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import api from '@/api'

const cookieString = 'hireMeAppCookie'

export const useAppStore = defineStore('app', {
  state: () => ({
    showCookieConsent: false,
    page: 'zero',
    score: 0,
    sessionId: null
  }),
  getters: {},
  actions: {
    async loadAppState() {
      const { cookies } = useCookies()
      const cookie = cookies.get(cookieString)
      if (!cookie) {
        this.showCookieConsent = true
      } else {
        const { data } = await api.post('whatsupdoc', { sessionId: cookie })
        this.page = data.page
        this.sessionId = cookie
        this.score = data.score
      }
    },

    async consentToCookies() {
      const { cookies } = useCookies()
      const { data } = await api.post('bringiton')
      this.page = data.page
      this.sessionId = data.sessionId
      this.score = data.score
      cookies.set(cookieString, data.sessionId)
    }
  }
})
