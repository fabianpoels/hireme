import { defineStore } from 'pinia'
import api from '@/api'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const cookieString = 'hireMeAppCookie'

export const useAppStore = defineStore('app', {
  state: () => ({
    showCookieConsent: false,
    page: 'zero',
    allPages: [
      'zero',
      'info',
      'email',
      'otp',
      'ping',
      'console',
      'username',
      'button',
      'teapot',
      'cookie',
      'cookie2',
      'qr',
      'complex',
      'timer',
      'scores'
    ],
    score: 0,
    sessionId: null,
    hints: [],
    hintsLeft: false,
    showMainButtons: false,
    scores: []
  }),
  getters: {
    progress: (state) => {
      const index = state.allPages.findIndex((el) => el === state.page)
      return Math.round((index / state.allPages.length) * 100)
    },

    sortedScores: (state) => {
      return state.scores
        .sort((a, b) => b.score - a.score)
        .map((score, index) => ({ position: index + 1, ...score }))
    }
  },
  actions: {
    async loadAppState() {
      const cookie = cookies.get(cookieString)
      if (!cookie) {
        this.showCookieConsent = true
      } else {
        try {
          let { data } = await api.post('whatsupdoc', { sessionId: cookie })
          this.page = data.page
          if (this.page !== 'zero') this.showMainButtons = true
          this.sessionId = cookie
          this.score = data.score
          await this.loadHints()
        } catch (e) {
          throw e
        }
      }
    },

    async loadScores() {
      if (!this.sessionId) return
      const { data } = await api.post('scores', { sessionId: this.sessionId })
      this.scores = data
    },

    async consentToCookies() {
      const { data } = await api.post('bringiton')
      cookies.set(cookieString, data.sessionId)
      this.page = data.page
      this.sessionId = data.sessionId
      this.score = data.score
      return cookies.get(cookieString) === data.sessionId
    },

    async answerPage(answer) {
      const { data, status } = await api.post('answer', { answer, sessionId: this.sessionId })
      if (status === 200) {
        this.page = data.participant.page
        this.score = data.participant.score
        await this.loadHints()
        return data.valid
      }
      return false
    },

    async loadHints() {
      try {
        const { data } = await api.post('hints', { sessionId: this.sessionId, page: this.page })
        this.hints = data.hints
        this.hintsLeft = data.hasHintsLeft
      } catch (e) {
        console.error(e)
      }
    },

    async getHint() {
      const { data } = await api.post('takehint', { sessionId: this.sessionId, page: this.page })
      const { hints, participant } = data
      this.hints = hints.hints
      this.hintsLeft = hints.hasHintsLeft
      this.page = participant.page
      this.score = participant.score
    }
  }
})
