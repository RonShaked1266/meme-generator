'use strict'

var gElCanvas
var gCtx

function onInit() {
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


function draw(txtObj, ev) {
    ev.preventDefault()
    const meme = getMeme()
    switch (meme.selectedLineIdx) {
        case 0:
            drawText(txtObj, gElCanvas.width / 2, gElCanvas.height / 11)
            break;
        case 1:
            drawText(txtObj, gElCanvas.width / 2, gElCanvas.height / 1.1);
            break;
        }
        const elTxt = document.querySelector('[name=txt]')
        elTxt.value = ''
    }
    // function txtDirection(ev) {
    //     console.log('center')
    //     const meme = getMeme()
    //     switch (meme.align) {
    //         case 'center':
    //             gCtx.textAlign = 'center'
    //             break;
    //             case 'right':
    //             gCtx.textAlign = 'right'
    //             break;
    //             case 'left':
    //             gCtx.textAlign = 'left'
    //             break;
    //     }
    // }
    
    
    function drawText(txt, x, y) {
        const font = document.querySelector('[name=select-font]').value
        console.log(font)
        const fillStyle = document.querySelector('.fill-style').value
        const strokeStyle = document.querySelector('.stroke-style').value
        console.log(txt)
        let elTxt = document.querySelector('.input-txt').value
        console.log(elTxt)
        gCtx.beginPath()
        gCtx.textBaseline = 'middle'
        gCtx.textAlign = 'center'
        gCtx.lineWidth = 1
        gCtx.font = font
        gCtx.fillStyle = fillStyle
        gCtx.strokeStyle = strokeStyle
        gCtx.fillText(elTxt, x, y)
        gCtx.strokeText(elTxt, x, y)
    gCtx.closePath()
    
    
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}



// function increaseFontSizeBy10px() {
//     
// }

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




