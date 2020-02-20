class World {
    constructor(noiseGenerator) {
        this.chunkManager = new ChunkManager(noiseGenerator)
        this.renderDistance = 10
        this.loadDistance = 2
    }

    draw(renderer) {
        const chunks = this.chunkManager.chunks
        for (var iChunk in chunks) {
            const chunk = chunks[iChunk]
            const chunkElement = chunk.element
            chunkElement.draw(renderer)
        }
    }

    loadChunks(camera) {
        var isBuffered = false
        var cameraX = parseInt(camera.position.x / CHUNK_SIZE)
        var cameraZ = parseInt(camera.position.z / CHUNK_SIZE)
        for (var i = 0; i < this.loadDistance; i++) {
            const minX = Math.max(cameraX - i, 0)
            const minZ = Math.max(cameraZ - i, 0)
            const maxX = cameraX + i
            const maxZ = cameraZ + i
            for (var x = minX; x < maxX; x++) {
                for (var z = minZ; z < maxZ; z++) {
                    this.chunkManager.load(x * CHUNK_SIZE, z * CHUNK_SIZE)
                    isBuffered = this.chunkManager.addToBuffer(x * CHUNK_SIZE, z * CHUNK_SIZE)
                }
            }
            if(isBuffered){
                break
            }
        }
        if(!isBuffered){
            this.loadDistance++
        }
        if(this.loadDistance > this.renderDistance){
            this.loadDistance = 2
        }
    }
}