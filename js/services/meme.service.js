'use strict'

const STORAGE_KEY = 'imgDB'

var gImgs
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gFilterBy = 'all'

gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny'] },
]


function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setImg(imgId) {
    if (imgId !== undefined) gMeme.selectedImgId = imgId
    // console.log(gMeme.selectedImgId)  
}

function setLineTxt(txt) {
    if (gMeme.selectedLineIdx === 0) gMeme.lines[0].txt = txt 
    if (gMeme.selectedLineIdx === 1) gMeme.lines[1].txt = txt 
    if (gMeme.selectedLineIdx === 2) gMeme.lines[2].txt = txt  
}

function toggleUpDown() {
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 1
    else if (gMeme.selectedLineIdx === 1) gMeme.selectedLineIdx = 0
    else if (gMeme.selectedLineIdx === 2) gMeme.selectedLineIdx = 0
    // console.log(gMeme.selectedLineIdx)
}

function addLine() {
    gMeme.selectedLineIdx = 2
    // console.log(gMeme.selectedLineIdx) 
}


function textAlign(align) {
    if (gMeme.selectedLineIdx === 0) gMeme.lines[0].align = align 
    if (gMeme.selectedLineIdx === 1) gMeme.lines[1].align = align 
    if (gMeme.selectedLineIdx === 2) gMeme.lines[2].align = align 

}

// function increaseFontSizeBy1px() {
//     let size = 60
//     document.querySelector('.increas-font').onclick = () => ++size
// }

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {txt: '', size: 20, align: 'center', color: 'red'},
        {txt: '', size: 20, align: 'center', color: 'red'},
        {txt: '', size: 20, align: 'center', color: 'red'}
    ]
}
// console.log(gMeme.lines[0])


function getMeme() {
    return gMeme
}

function getImgsForDisplay() {
    if (gFilterBy === 'all') return gImgs
    const imgs = gImgs.filter(img =>
        (gFilterBy === img.keywords.find(word => gFilterBy === word)))

    return imgs
    // return gImgs
}


// temmperry solution:
function getImg(imgId) {
    // console.log(gImgs[imgId-1]) 
    // console.log(gImgs[imgId-1].url) 
    return gImgs[imgId - 1]
}

function getImgById(imgId) {
    // console.log(imgId)
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function _saveImgsToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
}


