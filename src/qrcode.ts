import { create } from "./lib/create"
import "@picocss/pico"
import QRCode from "qrcode"

const appRoot = document.querySelector<HTMLDivElement>("#appRoot")!

const dataInput = create("input")

const canvas = create("canvas")
const ctx = canvas.getContext("2d")!
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  updateCanvas()
}

const app = create("div", { className: "app" }, [dataInput, canvas])

const qrcodeCanvas = create("canvas")
const qrcodeCtx = qrcodeCanvas.getContext("2d")!
function updateCanvas() {
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  QRCode.toCanvas(qrcodeCanvas, dataInput.value)
  ctx.imageSmoothingEnabled = false
  let smallestSide = Math.min(window.innerWidth, window.innerHeight)
  ctx.drawImage(
    qrcodeCanvas,
    (window.innerWidth - smallestSide) / 2,
    (window.innerHeight - smallestSide) / 2,
    smallestSide,
    smallestSide,
  )
  qrcodeCtx.fillStyle = "#fff"
  qrcodeCtx.fillRect(0, 0, qrcodeCanvas.width, qrcodeCanvas.height)
}

dataInput.addEventListener("keydown", updateCanvas)
dataInput.addEventListener("keyup", updateCanvas)
dataInput.addEventListener("change", updateCanvas)

window.addEventListener("resize", resizeCanvas)

appRoot.appendChild(app)
appRoot.appendChild(canvas)

resizeCanvas()
