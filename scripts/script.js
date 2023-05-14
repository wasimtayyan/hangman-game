const word = []
const maxLives = 10
let live = maxLives
const gameMessage = document.querySelector('#message')
const message = document.createElement('h3')
message.classList.add('message')
const playAgain = document.getElementById('btn-rest')
async function getRandomWord() {
    const resp = await fetch("https://random-word-api.herokuapp.com/word?number=1")
    const array = await resp.json()
    word.push(array[0])
    console.log(word)
    replacLitters(word)
}
const blank = document.querySelector("#blanks")
const pargraph = document.createElement("p")
const blankInd = []
function replacLitters(word) {

    for (let i = 0; i < word[0].length; i++) {


        blankInd[i] = ' _ '
    }
    pargraph.textContent += blankInd.join('')
    blank.appendChild(pargraph)
}
console.log(blankInd)
const btns = document.querySelectorAll(".btn")
btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        btn.classList.toggle('clicked')
        let value = btn.getAttribute('value')
        checkletters(value)
    })
})

function checkletters(value) {
    let letter = word[0]
    let indices = [];


    for (let i = 0; i < letter.length; i++) {
        if (live != 0) {
            // console.log(letter)
            if (letter[i] === value) {
                indices.push(i);
                blankInd[i] = value
                pargraph.textContent = blankInd.join('')

            }
            const gussed = blankInd.join('')
            if (gussed === letter) {
                pargraph.style.display = 'none'
                message.textContent = 'you won!!!'
                // gameMessage.appendChild(wonMessage)
            }

        }
    }

    if (!letter.includes(value)) {
        message.textContent = `you have ${live} lives`
        const draw = document.querySelectorAll('.drow span')
        draw[10 - live].style.display = "inline-block"
        live--
        if (live < 1) {
            message.textContent = `GAME OVER! the word was ${letter} !!!`
            pargraph.style.display = 'none'
        }
        gameMessage.appendChild(message)
    }


}
playAgain.addEventListener('click', () => {
    location.reload()
})
getRandomWord()