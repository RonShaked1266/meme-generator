'use strict'

let gElCanvas
let gCtx
let gStartPos
let gDrag = false

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderCanvas()
    addListeners()
}

function renderCanvas() {
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderText()
}

//RENDER-TEXT&IMG FOR DRAG&DROP
function renderText() {
    const meme = getMeme()
    const line = getSelectedLine()
    const { pos, txt, size } = line
    const imgId = meme.selectedImgId
    const imgObj = getImg(imgId)
    const img = new Image()
    if (imgObj !== undefined) {
        img.src = imgObj.url
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(txt, pos.x, pos.y)
        // gCtx.strokeRect( pos.x - (gCtx.measureText(txt).width / 2) ,
        //  pos.y - (size / 2), gCtx.measureText(txt).width, size)
    }
}

// RENDER-MEME
function renderMeme() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const imgObj = getImg(imgId)
    const img = new Image()
    if (imgObj !== undefined) {
        img.src = imgObj.url
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTextInLine()
    }
    const line = getSelectedLine()
    const { pos, txt } = line
    // console.log(meme)
    drawTextInLine(txt)

}

// RENDER-IMG
function renderImg() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const imgObj = getImg(imgId)
    // const imgObj = getImgById(imgId)
    // console.log(imgObj)
    const img = new Image()
    // console.log(img)
    if (imgObj !== undefined) {
        img.src = imgObj.url
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

//DRAW-TEXT/RECT
function drawTextInLine() {
    const meme = getMeme()
    const line = getSelectedLine()
    meme.lines.forEach(line => {
        drawRect()
        drawText(line.txt, gElCanvas.width / 2, gElCanvas.height / line.height)
    })
}

function drawText(txt, x, y) {
    const font = document.querySelector('[name=select-font]').value
    const fillStyle = document.querySelector('.fill-style').value
    const strokeStyle = document.querySelector('.stroke-style').value
    const meme = getMeme()
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.lineWidth = 1
    gCtx.fillStyle = fillStyle
    gCtx.strokeStyle = strokeStyle
    // console.log(meme.lines[meme.selectedLineIdx].align)
    gCtx.textAlign = meme.lines[meme.selectedLineIdx].align
    gCtx.font = meme.lines[meme.selectedLineIdx].size + 'px ' + font
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
}

function drawRectLine() {
    const meme = getMeme()
    const linesSpace = gElCanvas.height / 1.1 - gElCanvas.height / 2
    meme.lines.forEach((line, idx) => {
        const { color, size, txt } = line
        gCtx.strokeStyle = color
        line.y = (gElCanvas.height / 11 - (size / 2)) + (idx * (linesSpace))
        line.x = 0
        if (idx === meme.selectedLineIdx) {
            gCtx.strokeRect(line.x, line.y, gElCanvas.width, size)
        }
    })
}

function drawRect() {
    // console.log('rect')
    const input = document.querySelector('[name=txt]')
    setLineTxt(input.value)
    const meme = getMeme()
    const linesSpace = gElCanvas.height / 1.1 - gElCanvas.height / 2
    meme.lines.forEach((line, idx) => {
        const { color, size, txt, align } = line
        gCtx.strokeStyle = 'transparent'
        line.y = (gElCanvas.height / 11 - (size / 2)) + (idx * (linesSpace))
        // console.log(gCtx.measureText(txt).width)
        if (align === 'center') line.x = (gElCanvas.width - gCtx.measureText(txt).width) / 2
        if (align === 'left') line.x = (gElCanvas.width / 2) - (gCtx.measureText(txt).width / 2)
        if (align === 'right') line.x = gElCanvas.width - (gCtx.measureText(txt).width / 2)
        if (gCtx.measureText(txt).width === 0) return
        gCtx.strokeRect(line.x, line.y, gCtx.measureText(txt).width, size)
    })
}

// function onTextClicked(ev) {
//     const meme = getMeme()
//     const line = getSelectedLine()
//     const { pos, txt, size } = line
//     console.log(pos)
//     let clickedText = meme.lines.find(line => {
//         return ev.offsetX >= pos.x - (gCtx.measureText(txt).width / 2)
//             && ev.offsetX <= pos.x + gCtx.measureText(txt).width / 2
//             && ev.offsetY >= pos.y - (size / 2)
//             && ev.offsetY <= size
//     })
//     console.log(clickedText)
//     return clickedText
// }

function onTextClicked(ev) {
    const meme = getMeme()
    let clickedText = meme.lines.find(line => {
        return ev.offsetX >= line.x
            && ev.offsetX <= line.x + (line.txt.length * line.size / 2)
            && ev.offsetY >= line.y
            && ev.offsetY <= line.y + line.size
    })
    console.log(clickedText)
    return clickedText
}

//CONTROL-BOX
function onSwitchLines() {
    document.body.classList.toggle('updown-clicked')
    renderMeme()
    switchLines()
    drawRectLine()
    const input = document.querySelector('[name=txt]')
    input.value = ''
    // console.log(gMeme.selectedLineIdx)
}

function onAddLine() {
    document.body.classList.toggle('add-clicked')
    renderMeme()
    addLine()
    drawRectLine()
    const input = document.querySelector('[name=txt]')
    input.value = ''
    // console.log(gMeme.selectedLineIdx)
}

function onTextAlign(align) {
    document.body.classList.toggle(align)
    renderMeme()
    textAlign(align)
    renderMeme()
}

function onChangeFontSize(diff) {
    document.body.classList.toggle('size-up-clicked')
    changeFontSize(diff)
    renderMeme()
}

function onSetFont() {
    document.body.classList.toggle('font-clicked')
    renderMeme()
}

function onSetColor(color) {
    document.body.classList.toggle('color-clicked')
    setColor(color)
    renderMeme()
}

function clearCanvas() {
    document.body.classList.toggle('trash-clicked')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderImg()
}

function onClearLine() {
    document.body.classList.toggle('trash-clicked')
    // const line = getSelectedLine()
    // const { size , height} = line
    // gCtx.clearRect(0, height, gElCanvas.width, size)
    // setLineTxt('')
    // renderMeme()
    const meme = getMeme()
    meme.lines.forEach(line => {
        line.txt = ''
    })
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderImg()
    const input = document.querySelector('[name=txt]')
    input.value = ''
}
//
// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

//DRAG&DROP
function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        // resizeCanvas()
        const meme = getMeme()
        const line = meme.lines[0]
        const { txt } = line
        drawText(txt, gElCanvas.width / 2, gElCanvas.height / 2)
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    // const meme = getMeme()
    // Getting the clicked position
    const pos = getEvPos(ev)
    console.log(pos)
    if (!onTextClicked(ev)) return
    gDrag = true
    console.log(gDrag)
    setTextDrag(true)
    gStartPos = pos
    document.querySelector('#my-canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getSelectedLine()
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderCanvas()
}

function onUp() {
    setTextDrag(false)
    document.querySelector('#my-canvas').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    setTextPos(pos.x, pos.y)
    return pos
}

//RANDOM-MEME
function drawRandomMeme() {
    document.body.classList.toggle('editor-open')
    const flexible = getRandomMeme()
    const imgId = flexible.id
    const imgObj = getImg(imgId)
    const img = new Image()
    img.src = imgObj.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawRandomText(gElCanvas.width / 2, gElCanvas.height / 2)
        drawRandomText(gElCanvas.width / 2, gElCanvas.height / 11)
        drawRandomText(gElCanvas.width / 2, gElCanvas.height / 1.1)
    }
}

function drawRandomText(x, y) {
    const flexible = getRandomMeme()
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 1
    gCtx.font = `${flexible.size}px impact`
    gCtx.fillStyle = `${flexible.color1}`
    gCtx.fillText(`${flexible.txt}`, x, y)
    gCtx.strokeStyle = `${flexible.color2}`
    gCtx.strokeText(`${flexible.txt}`, x, y)
    gCtx.closePath()
}

//UPLOAD/DOWNLOAD/SHARE
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''

//     var reader = new FileReader()

//     reader.onload = (event) => {
//         var img = new Image()
//         img.src = event.target.result
//         img.onload = onImageReady.bind(null, img)
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }

// function renderImg(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }



// const input = document.querySelector('.input-txt')
// const log = document.getElementById('values')
// input.addEventListener('input', updateValue)

// function updateValue(el) {
//     log.textContent = el.target.value
//     console.log(log.textContent)
// }
// function clearLine() {
//     let line = document.querySelector('.contenteditable')
//     line.innerText = ''
// }
// function save(el){
//     console.log('Saving:', el.innerHTML)
// }




