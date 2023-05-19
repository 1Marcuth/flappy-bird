import createGame from "./game.js"

function start() {
    const $canvas = document.querySelector("canvas")
    const context = $canvas.getContext("2d")

    const sourceImage = new Image()
    sourceImage.src = "https://1marcuth.github.io/flappy-bird/assets/images/sprites.png"

    const sounds = {
        fall: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/fall.wav"),
        hit: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/hit.wav"),
        jump: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/jump.wav"),
        point: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/point.wav")
    }

    const game = createGame(context, sourceImage, sounds)

    game.initialize()
    game.run(16)
}

start()