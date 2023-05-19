function createScoreboard(state) {
    const { context } = state
    const $canvas = context.canvas

    const scoreboard = {
        score: 0,
        draw() {
            state.context.font = "35px VT323"
            state.context.textAlign = "right"
            state.context.fillStyle = "#fff"
            state.context.fillText(`${scoreboard.score}`, $canvas.width - 35, 35)
        },
        update() {
            if (state.frames > 150) {
                const framesInterval = 100
                
                if ((state.frames + 50) % framesInterval === 0) {
                    scoreboard.score += 1
                    state.sounds.point.play()
                }
            }
        }
    }

    return scoreboard
}

export default createScoreboard