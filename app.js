const API = "dict.1.1.20230708T223515Z.2e8fae7a99156f78.462cf69727135aaa88999961a59ea0c61a27a3c3"
const main = document.querySelector('.main')
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const a = document.querySelector('.a')
const revers = document.querySelector('.revers')
try {
  async function translate(leng, sting) {
    let answer = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API}&lang=${leng}&text=${sting}`)
    .then(answer => answer.json())
    let arr = []
    a.innerText = ''
    answer = answer['def']
    if (answer.length !== 0) {
      answer.map(s => {
        for (const i in s['tr']) {
          arr.push(s['tr'][i]['text'])
        }
      })
      a.innerText += arr.join(', ')
    }
    else {
      a.innerText += ' отсутствует.'
    }
  }
  function singleWord(string) {
    if(string.trim().split(' ').length > 0 && string.trim().split(' ') < 2) {
      return string.trim()
    } else {
      let s = string.trim().split(' ')
      return s[0]
    }
  }
  btn.addEventListener('click', () => {
    a.innerText = ''
    if (input.value.trim().length > 0) {
      translate(document.querySelector('select').value, singleWord(input.value))
    } else {
      return a.innerText = 'Input your word'
    }
  })
  revers.addEventListener('click', () => {
    if (a.textContent.length > 0) {
      document.querySelector('select').value = document.querySelector('select').value.split('-').reverse().join('-')
      input.value = a.textContent.split(', ')[0]
      translate(document.querySelector('select').value, input.value)
    } else {
      return
    }
  })
} catch (e) {
  throw new Error(e)
}


