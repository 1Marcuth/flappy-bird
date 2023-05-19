function createBackground(state) {
    const $canvas = state.context.canvas

    const background = {
        spriteX: 390,
        spriteY: 0,
        width: 275,
        height: 204,
        x: 0,
        y: $canvas.height - 204,
        draw() {
            state.context.fillStyle = "#70c5ce"
            state.context.fillRect(0, 0, $canvas.width, $canvas.height)
    
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

    return background
}

export default createBackground