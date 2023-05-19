import createGame from "./game.js"

function start() {
    const $canvas = document.querySelector("canvas")
    const context = $canvas.getContext("2d")

    const sourceImage = new Image()
    sourceImage.src = "../../../assets/images/sprites.png"

    const sounds = {
        fall: new Audio("../../../assets/sounds/fall.wav"),
        hit: new Audio("../../../assets/sounds/hit.wav"),
        jump: new Audio("../../../assets/sounds/jump.wav"),
        point: new Audio("../../../assets/sounds/point.wav")
    }

    const game = createGame(context, sourceImage, sounds)

    game.initialize()
    game.run(16)
}

start()