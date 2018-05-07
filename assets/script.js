
var btns = document.querySelectorAll(".tab-btn");
btns.forEach(btn => btn.addEventListener("click", changeTab));

var tabs = document.querySelectorAll(".tab");
var projectsCont = tabs[0];
var photosCont = tabs[1];

var projectExp = document.getElementsByClassName("project-expanded")[0];
var projectImg = projectExp.querySelector("img");
var projectTitle = projectExp.querySelector("h3");
var projectCat = projectExp.querySelector(".project-expanded__category");
var projectLink = projectExp.querySelector(".project-expanded__link");
var projectCreated = projectExp.querySelector(".project-expanded__created");
var projectTools = projectExp.querySelector(".project-expanded__tools");
var projectDesc = projectExp.querySelector(".project-expanded__desc");

var projectCloseBtn = document.getElementsByClassName("project-close-btn")[0];
projectCloseBtn.addEventListener("click", closeProject);

var overlay = document.getElementsByClassName("overlay")[0];
overlay.addEventListener("click", closeOverlay);
var overlayImg = overlay.querySelector("img");

document.getElementsByClassName("overlay-content")[0].addEventListener("click", function(e) {
  e.stopPropagation();
});

function closeOverlay() {
  this.style.display = "none";
}

function closeProject() {
  projectsCont.style.display = "grid";
  projectExp.style.display = "none";
}

function getProjects() {
  for(let i=0; i < projects.length; i++) {
    var newProj = `
      <div class="project" data-index="${i}">
        <img class="project__image" src="${projects[i].thumb}">
        <div class="project__details">
          <p class="project__name">${projects[i].name}</p>
          <p class="project__desc">${projects[i].category}</p>
      </div>`;
    projectsCont.innerHTML += newProj;
  }
}

function getPhotos() {
  for (let i=0; i < photos.length; i++) {
    var newPhoto = `
      <div class="photo photo-${Math.floor(Math.random()*5)}">
        <img src="${photos[i].thumb}">
      </div>`;
    photosCont.innerHTML += newPhoto;
  }
}

function changeTab() {
  projectExp.style.display = "none";
  tabs.forEach(tab => tab.style.display = "none");
  btns.forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(`li[data-name="${this.dataset.name}"]`).forEach(btn => btn.classList.add("active"));
  document.getElementsByClassName(this.dataset.name)[0].style.display = "grid";

  if (this.dataset.name === "photos" && photosCont.childNodes.length < 1) { //photos will only be loaded when the tab is opened
    getPhotos();
    var photos = document.querySelectorAll(".photo");
    photos.forEach(photo => photo.addEventListener("click", openPhoto));
  }
}

function openPhoto(e) {
  overlay.style.display = "grid";
  overlayImg.src = e.currentTarget.querySelector('img').src;
}

function openProject(e) {
  var projI = this.dataset.index;
  projectsCont.style.display = "none";
  projectExp.style.display = "grid";
  projectImg.src = projects[projI].image;
  projectTitle.innerHTML = projects[projI].name;
  projectCat.innerHTML = projects[projI].category;
  projectLink.innerHTML = projects[projI].link;
  projectLink.href = projects[projI].link;
  projectCreated.innerHTML = projects[projI].created;
  projectTools.innerHTML = projects[projI].tools;
  projectDesc.innerHTML = projects[projI].description;
}

getProjects();
var projs = document.querySelectorAll(".project");
projs.forEach(proj => proj.addEventListener("click", openProject));
