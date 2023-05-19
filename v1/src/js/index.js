const sprites = new Image()
sprites.src = "/assets/images/sprites.png"

const sounds = {
    fall: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/fall.wav"),
    hit: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/hit.wav"),
    jump: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/jump.wav"),
    point: new Audio("https://1marcuth.github.io/flappy-bird/assets/sounds/point.wav")
}

const globals = {}

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
let frames = 0

function collide(object1, object2) {
    return (object1.y + object1.height) >= object2.y
}

function createBird() {
    const bird = {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        gravityForce: 0.25, // 0.12,
        jumpForce: 4.6,
        speed: 0,
        movements: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 52 }
        ],
        currentFrame: 0,
        updateCurrentFrame() {
            const frameInterval = 15

            if (frames % frameInterval !== 0) return

            const baseOfIncrement = 1
            const increment = baseOfIncrement + bird.currentFrame
            const baseOfRepetition = bird.movements.length
            bird.currentFrame = increment % baseOfRepetition
        },
        update() {
            if (collide(bird, globals.floor)) {
                sounds.hit.play()
                return changeScreen(screens.over)
            }
    
            bird.speed += bird.gravityForce
            bird.y += bird.speed
        },
        draw() {
            bird.updateCurrentFrame()
            const { spriteX, spriteY } = bird.movements[bird.currentFrame]

            context.drawImage(
                sprites,
                spriteX,
                spriteY,
                bird.width,
                bird.height,
                bird.x,
                bird.y,
                bird.width,
                bird.height,
            )
        },
        jump() {
            sounds.jump.play()
            bird.speed =- bird.jumpForce
        }
    }

    return bird
}

function createFloor() {
    const floor = {
        spriteX: 0,
        spriteY: 610,
        width: 224,
        height: 112,
        x: 0,
        y: canvas.height - 112,
        update() {
            const floorMovement = 1
            const repeatIn = floor.width / 2
            const moviment = floor.x - floorMovement
            floor.x = moviment % repeatIn
        },
        draw() {
            context.drawImage(
                sprites,
                floor.spriteX,
                floor.spriteY,
                floor.width,
                floor.height,
                floor.x,
                floor.y,
                floor.width,
                floor.height,
            )
    
            context.drawImage(
                sprites,
                floor.spriteX,
                floor.spriteY,
                floor.width,
                floor.height,
                floor.x + floor.width,
                floor.y,
                floor.width,
                floor.height,
            )
        }
    }

    return floor
}

function createPipes() {
    const pipes = {
        sky: {
            spriteX: 52,
            spriteY: 169
        },
        floor: {
            spriteX: 0,
            spriteY: 169
        },
        width: 52,
        height: 400,
        space: 80,
        draw() {
            pipes.pairs.forEach(pair => {
                const pipeSpacing = 90
                const pipeTopX = pair.x
                const pipeTopY = pair.y

                context.drawImage(
                    sprites,
                    pipes.sky.spriteX,
                    pipes.sky.spriteY,
                    pipes.width,
                    pipes.height,
                    pipeTopX,
                    pipeTopY,
                    pipes.width,
                    pipes.height,
                )
    
                const pipeBottomX = pair.x
                const pipeBottomY = pipes.height + pipeSpacing + pipeTopY
    
                context.drawImage(
                    sprites,
                    pipes.floor.spriteX,
                    pipes.floor.spriteY,
                    pipes.width,
                    pipes.height,
                    pipeBottomX,
                    pipeBottomY,
                    pipes.width,
                    pipes.height,
                )

                pair.pipeTop = {
                    x: pipeTopX,
                    y: pipes.height + pipeTopY
                }
    
                pair.pipeBottom = {
                    x: pipeBottomX,
                    y: pipeBottomY
                }
            })
        },
        pairs: [],
        collide(pair) {
            if ((globals.bird.x + globals.bird.width) >= pair.x) {
                const birdHead = globals.bird.y
                const birdFoot = globals.bird.y + globals.bird.height

                if (birdHead <= pair.pipeTop.y) return true
                if (birdFoot >= pair.pipeBottom.y) return true
            }

            return false
        },
        update() {
            if (frames % 100 === 0) {
                pipes.pairs.push({
                    x: canvas.width,
                    y: Math.floor(
                        (Math.random() + 1) * -150
                    )
                })
            }

            pipes.pairs.forEach(pair => {
                pair.x -= 2

                if (pipes.collide(pair)) {
                    sounds.hit.play()
                    return changeScreen(screens.over)
                }

                if (pair.x + pipes.width <= 0) {
                    pipes.pairs.shift()
                }
            })
        }
    }

    return pipes
}

function createScoreboard() {
    const scoreboard = {
        score: 0,
        draw() {
            context.font = "35px VT323"
            context.textAlign = "right"
            context.fillStyle = "#fff"
            context.fillText(`${scoreboard.score}`, canvas.width - 35, 35)
        },
        update() {
            if (frames > 50) {
                const framesInterval = 100
                
                if ((frames + 50) % framesInterval === 0) {
                    scoreboard.score += 1
                    sounds.point.play()
                }
            }
        }
    }

    return scoreboard
}

const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,
    draw() {
        context.fillStyle = "#70c5ce"
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(
            sprites,
            background.spriteX,
            background.spriteY,
            background.width,
            background.height,
            background.x,
            background.y,
            background.width,
            background.height,
        )

        context.drawImage(
            sprites,
            background.spriteX,
            background.spriteY,
            background.width,
            background.height,
            background.x + background.width,
            background.y,
            background.width,
            background.height,
        )
    }
}

const initialScreen = {
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    x: (canvas.width / 2) - (174 / 2),
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            initialScreen.spriteX,
            initialScreen.spriteY,
            initialScreen.width,
            initialScreen.height,
            initialScreen.x,
            initialScreen.y,
            initialScreen.width,
            initialScreen.height,
        )
    }
}

const gameOverScreen = {
    spriteX: 134,
    spriteY: 153,
    width: 226,
    height: 200,
    x: (canvas.width / 2) - (226 / 2),
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            gameOverScreen.spriteX,
            gameOverScreen.spriteY,
            gameOverScreen.width,
            gameOverScreen.height,
            gameOverScreen.x,
            gameOverScreen.y,
            gameOverScreen.width,
            gameOverScreen.height,
        )
    }
}

const screens = {
    initial: {
        initialize() {
            globals.bird = createBird()
            globals.floor = createFloor()
        },
        draw() {
            background.draw()
            globals.floor.draw()
            globals.bird.draw()
            initialScreen.draw()
        },
        update() {
            globals.floor.update()
        },
        click() {
            changeScreen(screens.game)
        }
    },
    game: {
        initialize() {
            frames = 0
            globals.pipes = createPipes()
            globals.scoreboard = createScoreboard()
        },
        draw() {
            background.draw()
            globals.pipes.draw()
            globals.floor.draw()
            globals.bird.draw()
            globals.scoreboard.draw()
        },
        update() {
            globals.bird.update()
            globals.floor.update()
            globals.pipes.update()
            globals.scoreboard.update()
        },
        click() {
            globals.bird.jump()
        }
    },
    over: {
        draw() {
            gameOverScreen.draw()
        },
        update() {},
        click() {
            changeScreen(screens.initial)
        }
    }
}

let activeScreen = screens.initial
activeScreen.initialize()

function changeScreen(newScreen) {
    activeScreen = newScreen
    if (activeScreen.initialize) activeScreen.initialize()
}

function loop() {
    activeScreen.draw()
    activeScreen.update()
    frames += 1
}

canvas.addEventListener("click", (event) => {
    if (activeScreen.click) activeScreen.click()
})

window.addEventListener("keyup", (event) => {
    if (event.key !== " ") return
    if (activeScreen.click) activeScreen.click()
})

setInterval(loop, 16)