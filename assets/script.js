
var projI = null; //will store current project's index
var imgI = null; //will store cycle image's index
var imgInterval = null; //will store image interval id
//projects and photos -variables are in data.js

var btns = document.querySelectorAll(".tab-btn");
btns.forEach(btn => btn.addEventListener("click", changeTab));

var tabs = document.querySelectorAll(".tab");
var projectsCont = tabs[0];
var photosCont = tabs[1];

var projectExp = document.getElementsByClassName("project-expanded")[0];
var projectImg = projectExp.querySelector(".project-expanded__image");
var projectTitle = projectExp.querySelector("h3");
var projectCat = projectExp.querySelector(".project-expanded__category");
var projectLink = projectExp.querySelector(".project-expanded__link");
var projectCreated = projectExp.querySelector(".project-expanded__created");
var projectTools = projectExp.querySelector(".project-expanded__tools");
var projectDesc = projectExp.querySelector(".project-expanded__desc");
var projectNaviL = projectExp.querySelector(".navi-left");
var projectNaviR = projectExp.querySelector(".navi-right");

projectNaviL.addEventListener("click", prevProject);
projectNaviR.addEventListener("click", nextProject);

var projectCloseBtn = document.getElementsByClassName("project-close-btn")[0];
projectCloseBtn.addEventListener("click", closeProject);

var overlay = document.getElementsByClassName("overlay")[0];
overlay.addEventListener("click", closeOverlay);
var overlayImg = overlay.querySelector("img");

document.getElementsByClassName("scroll-up-btn")[0].addEventListener("click", function() {
  document.documentElement.scrollTop = 0;
});

function closeOverlay() {
  this.style.display = "none";
}

function closeProject() {
  clearInterval(imgInterval);
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
      <div class="photo">
        <img src="${photos[i].thumb}">
      </div>`;
    photosCont.innerHTML += newPhoto;
  }
}

function changeTab() {
  clearInterval(imgInterval);
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

function cycleImage() {
  if (projects[projI].images.length < imgI + 2) imgI = 0;
  else imgI += 1;

  projectImg.src = projects[projI].images[imgI];
  imgInterval = setTimeout(cycleImage, 4000);
}

function updateProject(i) {
  imgI = 0;
  clearInterval(imgInterval);
  projectImg.src = projects[i].images[0];
  projectTitle.innerHTML = projects[i].name;
  projectCat.innerHTML = projects[i].category;
  projectLink.innerHTML = projects[i].link;
  projectLink.href = projects[i].link;
  projectCreated.innerHTML = projects[i].created;
  projectTools.innerHTML = projects[i].tools;
  projectDesc.innerHTML = projects[i].description;

  projectNaviL.style.display = "grid";
  projectNaviR.style.display = "grid";

  if (projI == 0) projectNaviL.style.display = "none";
  else if (projI == projects.length - 1) projectNaviR.style.display = "none";

  if (projects[i].images.length > 1) {
    imgI = 0;
    imgInterval = setTimeout(cycleImage, 4000);
  }
}

function openProject(e) {
  projI = parseInt(this.dataset.index);
  projectsCont.style.display = "none";
  projectExp.style.display = "grid";
  updateProject(projI);
}

function prevProject() {
  imgI = 0;
  projI -= 1;
  updateProject(projI);
}

function nextProject() {
  imgI = 0;
  projI += 1;
  updateProject(projI);
}

getProjects();
var projs = document.querySelectorAll(".project");
projs.forEach(proj => proj.addEventListener("click", openProject));
