const sprites = new Image()
sprites.src = "./sprites.png"

const sounds = {
    fall: new Audio("assets/sounds/fall.wav"),
    hit: new Audio("assets/sounds/hit.wav"),
    jump: new Audio("assets/sounds/jump.wav"),
    point: new Audio("assets/sounds/point.wav")
}

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
        gravityForce: 0.12, // 0.25,
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
                return changeScreen(screens.initial)
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
                const pipeSkyX = pair.x
                const pipeSkyY = pair.y

                context.drawImage(
                    sprites,
                    pipes.sky.spriteX,
                    pipes.sky.spriteY,
                    pipes.width,
                    pipes.height,
                    pipeSkyX,
                    pipeSkyY,
                    pipes.width,
                    pipes.height,
                )
    
                const pipeFloorX = pair.x
                const pipeFloorY = pipes.height + pipeSpacing + pipeSkyY
    
                context.drawImage(
                    sprites,
                    pipes.floor.spriteX,
                    pipes.floor.spriteY,
                    pipes.width,
                    pipes.height,
                    pipeFloorX,
                    pipeFloorY,
                    pipes.width,
                    pipes.height,
                )
            })
        },
        pairs: [],
        update() {
            if (frames % 200 === 0) {
                pipes.pairs.push({
                    x: canvas.width,
                    y: Math.floor(
                        (Math.random() + 1) * -150
                    )
                })
            }

            pipes.pairs.forEach(pair => {
                pair.x -= 2

                if (collide(globals.bird, pipes)) {
                    
                }

                if (pair.x + pipes.width <= 0) {
                    pipes.pairs.shift()
                }
            
            })
        }
    }

    return pipes
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

const globals = {}

const screens = {
    initial: {
        initialize() {
            globals.bird = createBird()
            globals.floor = createFloor()
            globals.pipes = createPipes()
        },
        draw() {
            background.draw()
            globals.pipes.draw()
            globals.floor.draw()
            globals.bird.draw()
            // globals.pipes.draw()
            //initialScreen.draw()
        },
        update() {
            globals.floor.update()
            globals.pipes.update()
        },
        click() {
            changeScreen(screens.game)
        }
    },
    game: {
        draw() {
            background.draw()
            globals.floor.draw()
            globals.bird.draw()
        },
        update() {
            globals.bird.update()
            globals.floor.update()
        },
        click() {
            globals.bird.jump()
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

    requestAnimationFrame(loop)
}

window.addEventListener("click", (event) => {
    if (activeScreen.click) activeScreen.click()
})

window.addEventListener("keyup", (event) => {
    event.preventDefault()
    if (event.key !== " ") return
    if (activeScreen.click) activeScreen.click()
})

loop()