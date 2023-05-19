function createFloor(state) {
    const $canvas = state.context.canvas

    const floor = {
        spriteX: 0,
        spriteY: 610,
        width: 224,
        height: 112,
        x: 0,
        y: $canvas.height - 112,
        update() {
            const floorMovement = 1
            const repeatIn = this.width / 2
            const moviment = this.x - floorMovement
            this.x = moviment % repeatIn
        },
        draw() {
            state.context.drawImage(
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
    
            state.context.drawImage(
                state.sourceImage,
                this.spriteX,
                this.spriteY,
                this.width,
                this.height,
                this.x + this.width,
                this.y,
                this.width,
                this.height,
            )
        }
    }

    return floor
}

export default createFloor