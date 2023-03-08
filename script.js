let imgs = ['./img/horse1.jpg', './img/man2.jpg', './img/pumpkin.jpg', './img/man1.jpg', './img/river.jpg', './img/beach.jpg', './img/mushroom.jpg', './img/mountains.jpg', './img/rose.jpg', './img/dunlins.jpg', './img/horse2.jpg', './img/muslim.jpg']
let favImgs = []
let trash = []
let heartIcon = './icon/heart.png';
let favIcon = './icon/filled-heart.png';
load();

function showCreditSection() {  

    document.getElementById('creditDropdown').classList.toggle('credit-dropdown');
    document.getElementById('creditDropdown').classList.toggle('d-none');

}

function renderIndex() {

    let gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    for (i = 0; i < imgs.length; i++) {
        gallery.innerHTML += imageBoxHtml();
    }

}

function zoomPicture(i) {

    let pictureZoom = document.getElementById('pictureZoom');
    pictureZoom.innerHTML = '';

    classListToggle();
    renderPictureZoom(i);   

}

function classListToggle() {

    pictureZoom.classList.add('picture-zoom');
    document.getElementById('body').classList.add('stop-scrolling');

}

function renderPictureZoom(i) {

    pictureZoom.innerHTML += zoomPictureHtml(i);
    checkHeartColor(i);

}

function closePictureZoom() {

    document.getElementById('pictureZoom').classList.remove('picture-zoom');
    document.getElementById('body').classList.toggle('stop-scrolling');

    let pictureZoom = document.getElementById('pictureZoom');
    pictureZoom.innerHTML = '';

    document.getElementById('body').classList.remove('stop-scrolling');

}

function picturePlusOne(i) {

    if (i == imgs.length - 1) {
        zoomPicture(0);
    } else {
        zoomPicture(i + 1)
    }

}

function pictureMinusOne(i) {

    if (i == 0) {
        zoomPicture(imgs.length - 1);
    } else {
        zoomPicture(i - 1)
    }

}

function favoriseImg(i) {
    
    if (favImgs.includes(imgs[i]) == true){
        x = favImgs.indexOf(imgs[i]);
        favImgs.splice(x, 1);
        document.getElementById('heartIcon').src = heartIcon;
        save();
    } else {
        favImgs.push(imgs[i]);
        document.getElementById('heartIcon').src = favIcon;
        save();
    }

}

function save() {

    let imgsAsText = JSON.stringify(imgs)
    let favImgsAsText = JSON.stringify(favImgs)

    localStorage.setItem('imgs', imgsAsText)
    localStorage.setItem('favImgs', favImgsAsText)

}

function load() {

    let imgsAsText = localStorage.getItem('imgs')
    let favImgsAsText = localStorage.getItem('favImgs')
    
    if(imgsAsText){
    imgs = JSON.parse(imgsAsText)
    }
    if(favImgsAsText){
    favImgs = JSON.parse(favImgsAsText)
    }

} 

function checkHeartColor(i) {

    if (favImgs.includes(imgs[i]) == true) {
        x = favIcon;
    } else {
        x = heartIcon;
    };
    document.getElementById('heartIcon').src = x;

}

/////// favorite //////

function renderFavorites() {

    let gallery = document.getElementById('favGallery');
    gallery.innerHTML = '';

    for (i = 0; i < favImgs.length; i++) {
        gallery.innerHTML += favImageBoxHtml();
    }

}

function zoomFavPicture(i) {

    let pictureZoom = document.getElementById('pictureZoom');
    pictureZoom.innerHTML = '';

    classListToggle();
    renderFavPictureZoom(i);   

}

function renderFavPictureZoom(i) {

    pictureZoom.innerHTML += zoomFavPictureHtml(i);

}

function closeFavPictureZoom() {

    document.getElementById('pictureZoom').classList.remove('picture-zoom');
    document.getElementById('body').classList.toggle('stop-scrolling');

    let pictureZoom = document.getElementById('pictureZoom');
    pictureZoom.innerHTML = '';

    document.getElementById('body').classList.remove('stop-scrolling');

}

function deleteFavImg(i) {

    favImgs.splice(i, 1)
    save();
    renderFavorites();

}

///////// HTML //////////////

function imageBoxHtml() {

    return `
    <div class="image-box" >
        <img class="gallery-img" src="${imgs[i]}">
        <div onclick="zoomPicture(${i}); " class="overlay">
            <img id="check" class="check-icon" src="./icon/check.png" >
        </div>
   
    </div>
 `;

}

function favImageBoxHtml() {

    return `
    <div class="image-box" >
        <img class="gallery-img" src="${favImgs[i]}">
        <div onclick="zoomFavPicture(${i}); " class="overlay">
            <img id="check" class="check-icon" src="./icon/check.png" >
        </div>
   
    </div>
 `;

}

function zoomPictureHtml(i) {

    return /* html*/ `
    <div onclick="event.stopPropagation()" id="pictureZoomBackground" class="zoom-bg">
    <img onclick="pictureMinusOne(${i})" id="arrowIconLeft" class="arrow-icon-left" src="./icon/arrow.png"> 
    <img onclick="picturePlusOne(${i})" id="arrowIconRight" class="arrow-icon-right" src="./icon/arrow.png">
    </div>
    <div  onclick="event.stopPropagation()" class="picture-zoom-bg">
        <img id="zoomPicture" class="picture-zoom-img" src="${imgs[i]}">
        <div class="edit-bar" >
        <img onclick="favoriseImg(${i})"  id="heartIcon"  class="edit-bar-icon" src="">
        <img class="edit-bar-icon" src="./icon/crop.png">
        <img class="edit-bar-icon" src="./icon/download.png">
        <img class="edit-bar-icon" src="./icon/delete.png">
        </div>
    </div>
    `

}

function zoomFavPictureHtml(i) {

    return /* html*/ `
    <div onclick="event.stopPropagation()" id="pictureZoomBackground" class="zoom-bg">
    <img onclick="pictureMinusOne(${i})" id="arrowIconLeft" class="arrow-icon-left" src="./icon/arrow.png"> 
    <img onclick="picturePlusOne(${i})" id="arrowIconRight" class="arrow-icon-right" src="./icon/arrow.png">
    </div>
    <div  onclick="event.stopPropagation()" class="picture-zoom-bg">
        <img id="zoomPicture" class="picture-zoom-img" src="${favImgs[i]}">
        <div class="edit-bar" >
        <img onclick="deleteFavImg(${i}); closeFavPictureZoom();"  id="heartIcon"  class="edit-bar-icon" src="./icon/filled-heart.png">
        <img class="edit-bar-icon" src="./icon/crop.png">
        <img class="edit-bar-icon" src="./icon/download.png">
        <img class="edit-bar-icon" src="./icon/delete.png">
        </div>
    </div>
    `;

}







