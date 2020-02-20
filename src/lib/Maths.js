class Maths{
    static smoothInterpolation(bottomLeft, topLeft, bottomRight, topRight,
        xMin, xMax,
        zMin, zMax,
        x, z) {
        var width = xMax - xMin,
            height = zMax - zMin
        var xValue = 1 - (x - xMin) / width
        var zValue = 1 - (z - zMin) / height

        var a = this.smoothstep(bottomLeft, bottomRight, xValue)
        var b = this.smoothstep(topLeft, topRight, xValue)
        return this.smoothstep(a, b, zValue)
    }

    static smoothstep(edge0, edge1, x) {
        x = x * x * (3 - 2 * x)
        return (edge0 * x) + (edge1 * (1 - x))
    }
}