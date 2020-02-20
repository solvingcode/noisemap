class Camera{
    constructor(position){
        this.position = position
        this.speed = 5
    }
    move(dx, dz){
        this.position.x += dx * this.speed
        this.position.z += dz * this.speed
    }
}