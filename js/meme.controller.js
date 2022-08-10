'use strict'

var gElCanvas
var gCtx

function init() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // drawImg()
    renderMeme()
    
}

function renderMeme() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const imgObj = getImgById(imgId)
    console.log(imgObj)
    const img = new Image()
    console.log(img)
    img.src = imgObj.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onUpdateCanvas() {
    console.log()

}





