'use strict'

var gElCanvas
var gCtx

function init() {
    renderGallery()
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    
}

function renderMeme() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const imgObj = getImg(imgId)
    // const imgObj = getImgById(imgId)
    // console.log(imgObj)
    const img = new Image()
    // console.log(img)
    img.src = imgObj.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(txtObj, ev, x, y) {
    const fillStyle = document.querySelector('.fill-style').value
    const strokeStyle = document.querySelector('.stroke-style').value
    ev.preventDefault()
    console.log(txtObj)
    const elTxt = document.querySelector('.input-up').value
    console.log(elTxt)
    gCtx.beginPath()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 1;
    gCtx.font = '50px david';
    gCtx.fillStyle = fillStyle;
    gCtx.strokeStyle = strokeStyle;
    gCtx.fillText(elTxt, x, y);
    gCtx.strokeText(elTxt, x, y);
    gCtx.closePath()
    _saveImgsToStorage()
}
function drawTextUp(txtObj, ev) {
    const fillStyle = document.querySelector('.fill-style').value
    const strokeStyle = document.querySelector('.stroke-style').value
    ev.preventDefault()
    console.log(txtObj)
    const elTxt = document.querySelector('.input-up').value
    console.log(elTxt)
    gCtx.beginPath()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 1;
    gCtx.font = '50px david';
    gCtx.fillStyle = fillStyle;
    gCtx.strokeStyle = strokeStyle;
    gCtx.fillText(elTxt, gElCanvas.width / 2, gElCanvas.height / 11);
    gCtx.strokeText(elTxt, gElCanvas.width / 2, gElCanvas.height / 11);
    gCtx.closePath()
    _saveImgsToStorage()
}
function drawTextDown(txtObj, ev) {

    ev.preventDefault()
    console.log(txtObj)
    const elTxt = document.querySelector('.input-down').value
    console.log(elTxt)
    gCtx.beginPath()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 1;
    gCtx.font = '50px david';
    gCtx.fillStyle = 'yellow';
    gCtx.strokeStyle = 'green';
    gCtx.fillText(elTxt, gElCanvas.width / 2, gElCanvas.height / 1.1);
    gCtx.strokeText(elTxt, gElCanvas.width / 2, gElCanvas.height / 1.1);
    gCtx.closePath()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}



// function increaseFontSizeBy10px() {
//     
// }




