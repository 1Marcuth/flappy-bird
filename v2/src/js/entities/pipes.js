function createPipes(state, observer) {
    const pipes = {
        top: {
            spriteX: 52,
            spriteY: 169
        },
        bottom: {
            spriteX: 0,
            spriteY: 169
        },
        width: 52,
        height: 400,
        spacing: 90,
        draw() {
            this.pairs.forEach(pair => {
                const pipeTopX = pair.x
                const pipeTopY = pair.y

                state.context.drawImage(
                    state.sourceImage,
                    this.top.spriteX,
                    this.top.spriteY,
                    this.width,
                    this.height,
                    pipeTopX,
                    pipeTopY,
                    this.width,
                    this.height
                )
    
                const pipeBottomX = pair.x
                const pipeBottomY = this.height + this.spacing + pipeTopY
    
                state.context.drawImage(
                    state.sourceImage,
                    this.bottom.spriteX,
                    this.bottom.spriteY,
                    this.width,
                    this.height,
                    pipeBottomX,
                    pipeBottomY,
                    this.width,
                    this.height
                )

                pair.pipeTop = {
                    x: pipeTopX,
                    y: this.height + pipeTopY
                }
    
                pair.pipeBottom = {
                    x: pipeBottomX,
                    y: pipeBottomY
                }
            })
        },
        pairs: [],
        collide(pair) {
            if ((state.bird.x + state.bird.width) >= pair.x) {
                const birdHead = state.bird.y
                const birdFoot = state.bird.y + state.bird.height

                if (birdHead <= pair.pipeTop.y) return true
                if (birdFoot >= pair.pipeBottom.y) return true
            }

            return false
        },
        update() {
            const $canvas = state.context.canvas

            if (state.frames % 100 === 0) {
                this.pairs.push({
                    x: $canvas.width,
                    y: Math.floor(
                        -150 * (Math.random() + 1)
                    )
                })
            }

            this.pairs.forEach(pair => {
                pair.x -= 2

                if (this.collide(pair)) {
                    state.sounds.hit.play()
                    return observer({ type: "bird-collided-into-pipe" })
                }

                if (pair.x + this.width <= 0) {
                    this.pairs.shift()
                }
            })
        }
    }

    return pipes
}

export default createPipes