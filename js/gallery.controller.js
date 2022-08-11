'use strict'

// function renderGallery() {
//     var imgs = getImgs()
//     var strHTMLs = imgs.map(img =>
//     `
//     <img id="${img.id}" class="img" src="${img.url}" 
//     onclick="onImgSelect('${img.id}')">
//     `
//     )
//     document.querySelector('.grid').innerHTML = strHTMLs.join('')
//     document.querySelector('.grid').innerHTML = ...strHTMLs
// }

function onImgSelect(elImg) {
    document.body.classList.toggle('editor-open')
    // console.log(elImg)
    const elImgId = elImg.id
    // console.log(elImgId)
    setImg(elImgId)
    // getImgById(elImgId)
    getImg(elImgId)
    renderMeme()
}