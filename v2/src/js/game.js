import {
    createBackground,
    createPipes,
    createFloor,
    createBird,
    createScoreboard
} from "./entities/index.js"
import {
    createGameOverScreen,
    createInitialScreen,
    screens
} from "./screens.js"
import {
    setLocalStorage,
    loadLocalStorage
} from "./utils.js"

function createGame(context, sourceImage, sounds) {
    const state = {
        context, sourceImage, sounds,
        width: context.canvas.width,
        height: context.canvas.height,
        currentScreen: screens.initial
    }

    function initialize() {
        state.background = createBackground(state)
        state.bird = createBird(state, gameObserver)
        state.floor = createFloor(state)
        state.pipes = createPipes(state, gameObserver)
        state.scoreboard = createScoreboard(state)
        state.frames = 0

        const localStorageData = loadLocalStorage()

        if (!localStorageData.bestScore) {
            setLocalStorage({ bestScore: 0 })
        }
    }

    function changeScreen(newScreen) {
        state.currentScreen = newScreen
    }

    function clickInCanvas() {
        const { currentScreen } = state

        const acceptedClicks = {
            initial() {
                state.frames = 0
                changeScreen(screens.game)
            },
            game() {
                state.bird.jump()
            },
            over() {
                initialize()
                changeScreen(screens.initial)
            }
        }

        const clickFunction = acceptedClicks[currentScreen.name]

        clickFunction()
    }

    function runFrame() {
        const { currentScreen } = state

        state.frames += 1

        const acceptedScreens = {
            initial() {
                const initialScreen = createInitialScreen(state)
                currentScreen.update(state.floor)
                currentScreen.draw(state.background, state.floor, state.bird, initialScreen)
            },
            game() {
                currentScreen.update(state.pipes, state.floor, state.bird, state.scoreboard)
                currentScreen.draw(state.background, state.pipes, state.floor, state.bird, state.scoreboard)
            },
            over() {
                const gameOverScreen = createGameOverScreen(state)
                currentScreen.draw(gameOverScreen)
            }
        }

        const screenFunction = acceptedScreens[currentScreen.name]

        screenFunction()
    }

    function gameObserver(command) {
        const eventType = command.type

        const acceptedEvents = {
            "bird-collided-into-pipe": () => {
                const { bestScore } = loadLocalStorage()
                const score = state.scoreboard.score

                if (score > bestScore) {
                    setLocalStorage({ bestScore: score })
                }

                return changeScreen(screens.over)
            },
            "bird-collided-into-floor": () => {
                const { bestScore } = loadLocalStorage()
                const score = state.scoreboard.score

                if (score > bestScore) {
                    setLocalStorage({ bestScore: score })
                }

                return changeScreen(screens.over)
            }
        }

        const eventFunction = acceptedEvents[eventType]

        eventFunction()
    }

    function run(interval) {
        setInterval(runFrame, interval)
    }

    console.log(loadLocalStorage())

    context.canvas.addEventListener("click", clickInCanvas)

    return {
        state,
        initialize,
        changeScreen,
        clickInCanvas,
        runFrame,
        run
    }
}

export default createGame