'use strict'

let gElCanvas
let gCtx
let gStartPos

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    renderCanvas()
    addListeners()
}

function renderCanvas() {
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderText()
}

//RENDER-TEXT&IMG
function renderText() {
    const meme = getMeme()
    const line = meme.lines[0]
    const { pos, txt } = line
    const imgId = meme.selectedImgId
    const imgObj = getImg(imgId)
    const img = new Image()
    if (imgObj !== undefined) {
        img.src = imgObj.url
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(txt, pos.x, pos.y)
    }
}

// RENDER-IMG
function renderMeme() {
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
        drawRectLine()
        drawInLine()

    }
}
function onSetLineTxt(txt) {
    setLineTxt(txt)
    console.log(txt)
    renderMeme()
}

//DRAW-TEXT/RECT
function drawInLine() {
    // const input = document.querySelector('[name=txt]')
    // setLineTxt(input.value)
    const meme = getMeme()
    switch (meme.selectedLineIdx) {
        case 0:
            drawText(meme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 11)
            break;
        case 2:
            drawText(meme.lines[2].txt, gElCanvas.width / 2, gElCanvas.height / 1.1)
            break;
        case 1:
            drawText(meme.lines[1].txt, gElCanvas.width / 2, gElCanvas.height / 2)
            break;
    }
    // console.log(meme)
    // console.log(input)
    // input.value = ''
}

function drawText(txt, x, y) {
    // clearCanvas()
    // renderMeme()
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
    drawRect()
    gCtx.closePath()
}

function drawRect() {
    // console.log('rect')
    const input = document.querySelector('[name=txt]')
    setLineTxt(input.value)
    const meme = getMeme()
    const linesSpace = gElCanvas.height / 1.1 - gElCanvas.height / 2
    meme.lines.forEach((line, idx) => {
        const { color, size, txt, align } = line
        gCtx.strokeStyle = color
        line.y = (gElCanvas.height / 11 - (size / 2)) + (idx * (linesSpace))
        // console.log(gCtx.measureText(txt).width)
        if (align === 'center') line.x = (gElCanvas.width - gCtx.measureText(txt).width) / 2
        if (align === 'left') line.x = (gElCanvas.width / 2) - (gCtx.measureText(txt).width / 2)
        // if (align === 'right') line.x = gElCanvas.width - (gCtx.measureText(txt).width / 2)
        if (gCtx.measureText(txt).width === 0) return
        gCtx.strokeRect(line.x, line.y, gCtx.measureText(txt).width, size)

    })
}

function isTextClicked(ev) {
    const meme = getMeme()
    let clickedText = meme.lines.find(line => {
        return ev.offsetX >= line.x
            && ev.offsetX <= line.x + (line.txt.length * line.size / 2)
            && ev.offsetY >= line.y
            && ev.offsetY <= line.y + line.size
    })
    console.log(clickedText)
    return clickedText
    // if (clickedText) {
    //     console.log('!')
    // }
}

function drawRectLine() {
    const meme = getMeme()
    const linesSpace = gElCanvas.height / 1.1 - gElCanvas.height / 2
    meme.lines.forEach((line, idx) => {
        const { color, size, txt } = line
        gCtx.strokeStyle = color
        line.y = (gElCanvas.height / 11 - (size / 2)) + (idx * (linesSpace))
        line.x = 0
        if (gCtx.measureText(txt).width === 0 && idx === meme.selectedLineIdx) {
            gCtx.strokeRect(line.x, line.y, gElCanvas.width, size)
        }

    })
}

//CONTROL-BOX
function onToggleUpDown() {
    document.body.classList.toggle('updown-clicked')
    toggleUpDown()
    drawRectLine()
    // drawInLine()
}

function onAddLine() {
    document.body.classList.toggle('add-clicked')
    addLine()
    drawRectLine()
    // drawInLine()
}

function onTextAlign(align) {
    document.body.classList.toggle(align)
    textAlign(align)
    drawInLine()
}

function onChangeFontSize(diff) {
    document.body.classList.toggle('size-up-clicked')
    changeFontSize(diff)
    drawInLine()
}
function onIncreaseFontSize() {
    document.body.classList.toggle('size-up-clicked')
    increaseFontSizeBy1px()
    drawInLine()
}

function onDecreaseFontSize() {
    document.body.classList.toggle('size-down-clicked')
    decreaseFontSizeBy1px()
    drawInLine()
}

function onSetFont() {
    document.body.classList.toggle('font-clicked')
    drawInLine()
}

function onSetColor() {
    document.body.classList.toggle('color-clicked')
    drawInLine()
}

function clearCanvas() {
    document.body.classList.toggle('trash-clicked')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderMeme()
}

function clearLine() {
    document.body.classList.toggle('trash-clicked')
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    const { size } = line
    let idx
    switch (meme.selectedLineIdx) {
        case 0:
            idx = 11
            break;
        case 2:
            idx = 1.1
            break;
        case 1:
            idx = 2
            break;
    }
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height / idx + (size / 2)) 
    renderMeme()
}
//
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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

//DRAG&DROP
function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
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
    const meme = getMeme()
    // Getting the clicked position
    const pos = getEvPos(ev)
    console.log(pos)
    console.log(meme.lines[0])
    if (!isTextClicked(ev)) return
    setTextDrag(true)
    gStartPos = pos
    document.querySelector('#my-canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const line = meme.lines[0]
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




