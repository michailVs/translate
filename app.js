const API = "dict.1.1.20230708T223515Z.2e8fae7a99156f78.462cf69727135aaa88999961a59ea0c61a27a3c3"
const main = document.querySelector('.main')
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const a = document.querySelector('.a')
try {
  async function translate(leng, sting) {
    let answer = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API}&lang=${leng}&text=${sting}`)
    .then(answer => answer.json())
    let arr = []
    a.innerText = 'Перевод: '
    answer = answer['def']
    answer.map(s => {
      for (const i in s['tr']) {
        arr.push(s['tr'][i]['text'])
      }
    })
    a.innerText += arr.join(', ')
  }
  btn.addEventListener('click', () => {
    a.innerText = ''
    translate(document.querySelector('select').value, input.value.trim())
  })
  createSelect()
} catch (e) {
  throw new Error(e)
}


