'use strict'

const STORAGE_KEY = 'imgDB'

var gImgs
var gTxtObj = { txt: ''}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
]


function setImg(imgId) {
    if (imgId !== undefined) gMeme.selectedImgId = imgId
    // console.log(gMeme.selectedImgId)  
}

function setLineTxt(txtObj) {
    if (txtObj.txt !== undefined) gTxtObj.txt = txtObj.txt
    return gTxt 
}

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}

// temmperry solution:
function getImg(imgId) {
    // console.log(gImgs[imgId-1]) 
    // console.log(gImgs[imgId-1].url) 
    return gImgs[imgId-1]
}

function getImgById(imgId) {
    // console.log(imgId)
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function _saveImgsToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
}