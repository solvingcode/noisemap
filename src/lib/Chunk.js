class Chunk {
    constructor(position) {
        this.pixels = new Array(CHUNK_SIZE * CHUNK_SIZE)
        this.mesh = new Mesh(position)
        this.isLoaded = false
        this.isBuffered = false
        this.position = position
    }

    load(generator) {
        if (!this.isLoaded) {
            generator.generate(this)
            this.isLoaded = true
        }
    }

    setPixel(x, z, type, heightMap = 1) {
        if (!this.pixels[z * CHUNK_SIZE + x]) {
            this.pixels[z * CHUNK_SIZE + x] = new Pixel()
        }
        this.pixels[z * CHUNK_SIZE + x].type = type
        this.pixels[z * CHUNK_SIZE + x].heightMap = heightMap
    }

    draw(renderer) {
        if (this.isBuffered) {
            renderer.drawChunk(this)
        }
    }

    addToBuffer() {
        if (!this.isBuffered) {
            this.mesh.add(this.pixels)
            this.isBuffered = true
            return true
        }
        return false
    }
}