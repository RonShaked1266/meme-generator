'use strict'

const STORAGE_KEY = 'memeDB'

let gMeme
let gImgs
// let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gFilterBy = 'all'
let gRandomMeme

gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'baby', 'cat'] },
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

// function createMeme(pos, txt) {
//     gMeme = {
//         selectedImgId: 0,
//         selectedLineIdx: 0,
//         lines: [
//             { pos, txt, size: 50, align: 'center', color: 'white', isDrag: false },
//             { pos, txt, size: 50, align: 'center', color: 'white', isDrag: false },
//             { pos, txt, size: 50, align: 'center', color: 'white', isDrag: false }
//         ]
//     }
//     _saveMemesToStorage()
// }
gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        { pos: { x: 0, y: 0 }, txt: '', size: 50, align: 'center', color: 'white', isDrag: false },
        { pos: { x: 0, y: 0 }, txt: '', size: 50, align: 'center', color: 'white', isDrag: false },
        { pos: { x: 0, y: 0 }, txt: '', size: 50, align: 'center', color: 'white', isDrag: false }
    ]
}

gRandomMeme = {
    id: getRandomIntInclusive(1, 18),
    txt: makeLorem(4),
    color1: getRandomColor(),
    color2: getRandomColor(),
    size: getRandomIntInclusive(30, 60)
}

function getRandomMeme() {
    return gRandomMeme
}

function getMeme() {
    return gMeme
}



function getImgsForDisplay() {
    if (gFilterBy === 'all') return gImgs
    const imgs = gImgs.filter(img =>
    (gFilterBy.toLowerCase() === img.keywords.find(word => gFilterBy.toLowerCase() === word)
        && gFilterBy.toLowerCase().includes(gFilterBy.toLowerCase())))
    return imgs
}

// temporary solution:
function getImg(imgId) {
    // console.log(gImgs[imgId-1].url) 
    return gImgs[imgId - 1]
}

function getImgById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function setImg(imgId) {
    if (imgId !== undefined) gMeme.selectedImgId = imgId
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function addLine() {
    gMeme.selectedLineIdx = 1
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function toggleUpDown() {
    ++gMeme.selectedLineIdx
    
   
}
function toggleUpDown() {
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 2
    else if (gMeme.selectedLineIdx === 2) gMeme.selectedLineIdx = 0
    else if (gMeme.selectedLineIdx === 1) gMeme.selectedLineIdx = 2
}

function textAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}


function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}
function increaseFontSizeBy1px() {
    ++gMeme.lines[gMeme.selectedLineIdx].size
}

function decreaseFontSizeBy1px() {
    --gMeme.lines[gMeme.selectedLineIdx].size
}

//

function setTextDrag(isDrag) {
    gMeme.lines[0].isDrag = isDrag
}
function setTextPos(x, y) {
    gMeme.lines[0].pos.x = x
    gMeme.lines[0].pos.y = y
}
function moveText(dx, dy) {
    gMeme.lines[0].pos.x += dx
    gMeme.lines[0].pos.y += dy
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}


