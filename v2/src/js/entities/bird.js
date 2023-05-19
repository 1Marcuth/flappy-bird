function createBird(state, observer) {
    const bird = {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        gravityForce: 0.25,
        jumpForce: 4.6,
        speed: 0,
        movements: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 52 }
        ],
        currentFrame: 0,
        collide() {
            return (this.y + this.height) >= state.floor.y
        },
        updateCurrentFrame() {
            const frameInterval = 15

            if (state.frames % frameInterval !== 0) return

            const baseOfIncrement = 1
            const increment = baseOfIncrement + this.currentFrame
            const baseOfRepetition = this.movements.length
            this.currentFrame = increment % baseOfRepetition
        },
        update() {  
            if (this.collide()) {
                state.sounds.fall.play()
                state.sounds.hit.play()
                return observer({ type: "bird-collided-into-floor" })
            }
    
            this.speed += this.gravityForce
            this.y += this.speed
        },
        draw() {
            this.updateCurrentFrame()
            const { spriteX, spriteY } = this.movements[bird.currentFrame]

            state.context.drawImage(
                state.sourceImage,
                spriteX,
                spriteY,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height,
            )
        },
        jump() {
            state.sounds.jump.play()
            this.speed =- this.jumpForce
        }
    }

    return bird
}

export default createBird