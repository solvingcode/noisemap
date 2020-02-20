class Application {
    constructor(title, renderer, noiseGenerator, camera) {
        this.title = title
        this.renderer = renderer
        this.camera = camera
        this.world = new World(noiseGenerator)
        this.startTime = Date.now()
        this.nbFrame = 0
        this.runLoop = this.runLoop.bind(this)
    }

    loadEvents(){
        document.addEventListener('keydown', (event) => {
            const key = event.keyCode
            //up
            if(key === 38){
                this.camera.move(0, -1)
            }
            //down
            else if(key === 40){
                this.camera.move(0, 1)
            }
            //right
            else if(key === 39){
                this.camera.move(1, 0)
            }
            //left
            else if(key === 37){
                this.camera.move(-1, 0)
            }
        })
    }

    runLoop() {
        this.updateFPS()
        this.world.loadChunks(this.camera)
        this.world.draw(this.renderer)
        this.renderer.render(this.camera)
        requestAnimationFrame(this.runLoop)
    }

    updateFPS() {
        const deltaTime = (Date.now() - this.startTime) / 1000
        if (deltaTime > 1) {
            document.title = `${title} - (${parseInt(this.nbFrame / deltaTime)} FPS)`
            this.nbFrame = 0
            this.startTime = Date.now()
        } else {
            this.nbFrame++
        }
    }
}