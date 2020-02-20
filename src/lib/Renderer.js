class Renderer{
    constructor(){
        this.meshes = []
    }

    drawChunk(chunk){
        this.meshes.push(chunk.mesh)
    }

    render(camera){
        for(var iMesh in this.meshes){
            const mesh = this.meshes[iMesh]
            const cameraViewX = camera.position.x - WINDOW_WIDTH / 2
            const cameraViewZ = camera.position.z - WINDOW_HEIGHT / 2
            const meshX = parseInt(mesh.position.x) - cameraViewX
            const meshZ = parseInt(mesh.position.z) - cameraViewZ
            context.putImageData(mesh.imgData, meshX, meshZ)
        }
        this.meshes = []
    }
}