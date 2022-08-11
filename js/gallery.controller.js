'use strict'

// function renderGallery() {
//     var imgs = getImgs()
//     var strHTMLs = imgs.map(img =>
//     `
//     <a onclick="onImgSelect('${img.id}')">
//     <img id="${img.id}" class="img" src="${img.url}">
//     </a>  
//     `
//     )
//     document.querySelector('.grid').innerHTML = strHTMLs.join('')
// }

function onImgSelect(elImg) {
    console.log(elImg)
    const elImgId = elImg.id
    // console.log(elImg.id)
    console.log(elImgId)
    setImg(elImgId)
    // getImgById(elImgId)
    getImg(elImgId)
    renderMeme()
}