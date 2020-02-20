class NoiseGenerator{
    constructor(seed){
        this.seed = seed
        this.configs = {
            octaves: 9,
            amplitude: 80,
            persistance: 0.51,
            smoothness: 250
        }
    }

    setConfigs(configs){
        this.configs = configs
    }

    noise(x, z){
        const integerX = parseInt(x)
        const integerZ = parseInt(z)
    
        const fractionalX = x - integerX
        const fractionalZ = z - integerZ

        const a = this.getNoise(integerX, integerZ)
        const b = this.getNoise(integerX + 1, integerZ)

        const c = this.getNoise(integerX, integerZ + 1)
        const d = this.getNoise(integerX + 1, integerZ + 1)

        const f = this.cosineInterpolate(a, b, fractionalX)
        const g = this.cosineInterpolate(c, d, fractionalZ)

        const result = this.cosineInterpolate(f, g, fractionalZ)

        return result
    }

    getNoiseValue(t){
        t += this.seed
        t = BigInt((t << 13) ^ t)
        t = (t * (t * t * 15731n + 789221n) + 1376312589n)
        t = parseInt(t.toString(2).slice(-31), 2)
        return 1.0 - t / 1073741824
    }

    getNoise(x, z){
        return this.getNoiseValue(x + z * CHUNK_SIZE)
    }

    cosineInterpolate(a, b, t){
        const c = (1 - Math.cos(t * 3.1415927)) * .5
        return (1. - c) * a + c * b
    }

    perlinNoise(x, z){
        var r = 0
        for (var i = 0; i <= this.configs.octaves; i++) {
            var frequency = Math.pow(2, i)
            var amplitude = Math.pow(this.configs.persistance, i)
            var noise = this.noise(x * frequency / this.configs.smoothness, z * frequency / this.configs.smoothness)
            r += noise * amplitude
        }
        var result = (r / 2 + 1) * this.configs.amplitude - 20
        return result > 0 ? result : 1
    }

}