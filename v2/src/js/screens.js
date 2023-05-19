import { createPipes, createScoreboard } from "./entities/index.js"

function createInitialScreen(state) {
    const { context } = state
    const canvasWidth = context.canvas.width

    const initialScreen = {
        spriteX: 134,
        spriteY: 0,
        width: 174,
        height: 152,
        x: (canvasWidth / 2) - (174 / 2),
        y: 50,
        draw() {
            context.drawImage(
                state.sourceImage,
                this.spriteX,
                this.spriteY,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height,
            )
        }
    }

    return initialScreen
} 

function createGameOverScreen(state) {
    const { context } = state
    const canvasWidth = context.canvas.width

    const gameOverScreen = {
        spriteX: 134,
        spriteY: 153,
        width: 226,
        height: 200,
        x: (canvasWidth / 2) - (226 / 2),
        y: 50,
        draw() {
            context.drawImage(
                state.sourceImage,
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

    return gameOverScreen
}

const screens = {
    initial: {
        name: "initial",
        draw(...entities) {
            for (const entity of entities) {
                entity.draw()
            }
        },
        update(...entities) {
            for (const entity of entities) {
                entity.update()
            }
        }
    },
    game: {
        name: "game",
        draw(...entities) {
            for (const entity of entities) {
                entity.draw()
            }
        },
        update(...entities) {
            for (const entity of entities) {
                entity.update()
            }
        }
    },
    over: {
        name: "over",
        draw(...entities) {
            for (const entity of entities) {
                entity.draw()
            }
        },
        update() {}
    }
}

export {
    screens,
    createInitialScreen,
    createGameOverScreen
}