'use strict'

var gElCanvas
var gCtx

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
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

function draw(txt, ev) {
    ev.preventDefault()
    const meme = getMeme()
    const input = document.querySelector('[name=txt]')
    setLineTxt(txt)
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
    console.log(meme)
    console.log(input)
    input.value = ''
}

function drawText(txt, x, y) {
    const font = document.querySelector('[name=select-font]').value
    // console.log(font)
    const fillStyle = document.querySelector('.fill-style').value
    const strokeStyle = document.querySelector('.stroke-style').value
    const meme = getMeme()

    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    // console.log(meme.lines[meme.selectedLineIdx].align)
    gCtx.textAlign = meme.lines[meme.selectedLineIdx].align
    gCtx.lineWidth = 1
    gCtx.font = meme.lines[meme.selectedLineIdx].size + 'px ' + font
    gCtx.fillStyle = fillStyle
    gCtx.strokeStyle = strokeStyle
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
    drawRect()
    // drawRect1(50, 50)
}

// function drawRect1(x, y) {
//     gCtx.beginPath();
//     gCtx.rect(x, y, 200, 200);
//     gCtx.fillStyle = 'green';
//     gCtx.fillRect(x, y, 200, 200);
//     gCtx.strokeStyle = 'red';
//     gCtx.stroke();
//     gCtx.closePath();
// }

function onToggleUpDown() {
    document.body.classList.toggle('updown-clicked')
    toggleUpDown()
}

function onAddLine() {
    document.body.classList.toggle('add-clicked')
    addLine()
}

function onTextAlign(align) {
    document.body.classList.toggle(align)
    textAlign(align)
}

function onIncreaseFontSize() {
    document.body.classList.toggle('size-up-clicked')
    increaseFontSizeBy1px()
}

function onDecreaseFontSize() {
    document.body.classList.toggle('size-down-clicked')
    decreaseFontSizeBy1px()
}


function clearCanvas() {
    document.body.classList.toggle('trash-clicked')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderMeme()
}

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

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
        drawRandomMeme()
    })
}

function drawRect() {
    console.log('rect')
    const meme = getMeme()
    const linesSpace = gElCanvas.height / 1.1 - gElCanvas.height / 2
    meme.lines.forEach((line, idx) => { 
        const { color, size, txt } = line
        gCtx.strokeStyle = color
        line.y = (gElCanvas.height / 11 - (size / 2)) + (idx * (linesSpace))
        line.x = txt.length * size / 4
        // line.x = 0
        // line.x = txt.length * size / 2
        gCtx.strokeRect(line.x, line.y, (txt.length * size / 2) , size)
    })
}

function canvasClicked(ev) {
    const meme = getMeme()
    let clickedStar = null
    clickedText = meme.lines.find(line => {
        return ev.offsetX >= line.x && ev.offsetX <= line.x + line.txt.length &&
            ev.offsetY >= line.y && ev.offsetY <= line.y + line.size
    })
    if(clickedStar) { 
        console.log('!')
    }
}

function drawRandomMeme() {
    // ev.preventDefault
    document.body.classList.toggle('editor-open')
    const flexible = getRandomMeme()
    const imgId = flexible.id
    const imgObj = getImg(imgId)
    const img = new Image()
    // console.log(img)
    img.src = imgObj.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    drawRandomText(gElCanvas.width / 2, gElCanvas.height / 2)

}

function drawRandomText(x, y) {
    const flexible = getRandomMeme()
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 1
    gCtx.font = `${flexible.txt}px impact`
    gCtx.fillStyle = `${flexible.color}`
    gCtx.fillText(`${flexible.txt}`, x, y)
    gCtx.strokeStyle = `${flexible.color}`
    gCtx.strokeText(`${flexible.txt}`, x, y)
    // console.log(`${flexible.txt}`)
    gCtx.closePath()
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




