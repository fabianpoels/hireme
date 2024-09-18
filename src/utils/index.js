const extremelyFunnyErrorMessages = [
  "Something went horribly wrong. Even though I would like to blame it on the end user, it's probably my fault",
  "Something went wrong which shouldn't have gone wrong",
  'Do you even lift, bro?'
]

const urls = [
  'https://www.youtube.com/watch?v=sQRfp2Xp6U0',
  'https://pornhub.com',
  'https://www.scientology.org/',
  'https://www.cecm.sfu.ca/organics/papers/borwein/paper/html/local/bdigits.html'
]

function randomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomUrl() {
  return randomElementFromArray(urls)
}

const alert = {
  showError: function (toast, error) {
    toast.add({
      severity: 'error',
      summary: 'Success Message',
      detail: randomElementFromArray(extremelyFunnyErrorMessages),
      group: 'errors',
      life: 9000
    })
    console.error('BOOOOOOOOOOOOM')
    console.error(error)
  },

  showWrongAnswer: function (toast, msg) {
    toast.add({
      severity: 'warn',
      summary: 'Wrong answer',
      detail: msg,
      position: 'top-center',
      group: 'answers',
      life: 9000
    })
  }
}

export { alert, randomUrl, randomElementFromArray }
