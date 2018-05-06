
var btns = document.querySelectorAll(".tab-btn");
btns.forEach(btn => btn.addEventListener("click", changeTab));

var tabs = document.querySelectorAll(".tab");
var projectsCont = tabs[0];

console.log(projectsCont);

function getProjects() {
  for(let i=0; i < projects.length; i++) {
    console.log(projects[i].name);

    var newProj = document.createElement('div');
    var newDets = document.createElement('div');
    var newImg = document.createElement('img');
    var newName = document.createElement('p');
    var newDesc = document.createElement('p');

    newProj.classList.add("project");
    newDets.classList.add("project__details");
    newImg.classList.add("project__image");
    newName.classList.add("project__name");
    newDesc.classList.add("project__desc");

    newImg.src = projects[i].thumb;
    newName.innerHTML = projects[i].name;
    newDesc.innerHTML = projects[i].description;

    newDets.appendChild(newName);
    newDets.appendChild(newDesc);
    newProj.appendChild(newImg);
    newProj.appendChild(newDets);
    projectsCont.appendChild(newProj);
  }
}
getProjects();

function changeTab() {
  tabs.forEach(tab => tab.style.display = "none");
  btns.forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(`li[data-name="${this.dataset.name}"]`).forEach(btn => btn.classList.add("active"));
  document.getElementsByClassName(this.dataset.name)[0].style.display = "grid";
}
