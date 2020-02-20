const PixelType = {
    Air: 0,
    Grass: 1,
    Water: 2,
    Sand: 3,
    Dirt: 4,
    Snow: 5
}

class Pixel{
    constructor(){
        this.type = PixelType.Air
        this.heightMap = 1
    }
}