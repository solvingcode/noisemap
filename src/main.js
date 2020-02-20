const chunk = document.getElementById('chunk')
const context = chunk.getContext('2d')
const title = 'Noise map - Simulator'

context.canvas.width = WINDOW_WIDTH
context.canvas.height = WINDOW_HEIGHT

const seed = Math.random() * 10000
var noiseGenerator = new NoiseGenerator(seed)

var camera = new Camera({x: 50000, z: 50000})
var renderer = new Renderer()
var app = new Application(title, renderer, noiseGenerator, camera)

app.loadEvents()
app.runLoop()