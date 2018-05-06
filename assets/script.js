
var btns = document.querySelectorAll(".tab-btn");
btns.forEach(btn => btn.addEventListener("click", changeTab));

var tabs = document.querySelectorAll(".tab");
var projectsCont = tabs[0];
var photosCont = tabs[1];

function getProjects() {
  for(let i=0; i < projects.length; i++) {
    var newProj = `
      <div class="project">
        <img class="project__image" src="${projects[i].thumb}">
        <div class="project__details">
          <p class="project__name">${projects[i].name}</p>
          <p class="project__desc">${projects[i].description}</p>
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
  tabs.forEach(tab => tab.style.display = "none");
  btns.forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(`li[data-name="${this.dataset.name}"]`).forEach(btn => btn.classList.add("active"));
  document.getElementsByClassName(this.dataset.name)[0].style.display = "grid";

  if (this.dataset.name === "photos" && photosCont.childNodes.length < 1) {
    getPhotos();
  }
}

getProjects();
