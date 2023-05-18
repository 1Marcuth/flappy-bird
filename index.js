const sprites = new Image()
sprites.src = "./sprites.png"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const bird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    gravityForce: 0.12, // 0.25,
    speed: 0,
    update() {
        bird.speed += bird.gravityForce
        bird.y += bird.speed 
    },
    draw() {
        context.drawImage(
            sprites,
            bird.spriteX,
            bird.spriteY,
            bird.width,
            bird.height,
            bird.x,
            bird.y,
            bird.width,
            bird.height,
        )
    }
}

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
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
            floor.x + + floor.width,
            floor.y,
            floor.width,
            floor.height,
        )
    }
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

const pipeTop = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            bird.spriteX,
            bird.spriteY,
            bird.width,
            bird.height,
            bird.x,
            bird.y,
            bird.width,
            bird.height,
        )
    }
}

const pipeBottom = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            bird.spriteX,
            bird.spriteY,
            bird.width,
            bird.height,
            bird.x,
            bird.y,
            bird.width,
            bird.height,
        )
    }
}

function loop() {
    bird.update()

    background.draw()
    floor.draw()
    bird.draw()

    requestAnimationFrame(loop)
}

loop()