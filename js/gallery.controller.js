'use strict' 

function renderGallery() {
    var imgs = getImgsForDisplay()
    var strHTMLs = imgs.map(img =>
    `
    <img id="${img.id}" class="img" src="${img.url}" 
    onclick="onImgSelect(this)">
    `
    )
    document.querySelector('.grid').innerHTML = strHTMLs.join('')
}

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

function onSetFilterBy(filterBy) {
    setFilter(filterBy)
    renderGallery()
}
