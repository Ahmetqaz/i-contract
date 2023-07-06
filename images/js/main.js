var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
var body = document.body;

const closeMenu = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("active");
};

menuBtn.onclick = function () {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  body.classList.toggle("active");
};

const header = document.getElementById("header");
if (header)
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 400) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

const popUpBtn = document.getElementById("popUpBtn");
const popUp = document.getElementById("popUp");
const popupClose = document.getElementById("popupClose");
popUpBtn.addEventListener("click", () => {
  popUp.classList.toggle("active");
  body.classList.toggle("active");
});
popupClose.addEventListener("click", () => {
  popUp.classList.toggle("active");
  body.classList.toggle("active");
});

let testJSON =
  '[ "Abstandswarner","Blendfreies Fernlicht","Adaptives Kurvenlicht","Abstandswarner","Blendfreies Fernlicht", "Adaptives Kurvenlicht", "Abstandswarner","Blendfreies Fernlicht", "Adaptives Kurvenlicht","Abstandswarner", "Blendfreies Fernlicht","Adaptives Kurvenlicht", "Abstandswarner", "Blendfreies Fernlicht", "Adaptives Kurvenlicht","Abstandswarner","Blendfreies Fernlicht"," Adaptives Kurvenlicht","Abstandswarner","Blendfreies Fernlicht"," Adaptives Kurvenlicht","Abstandswarner","Blendfreies Fernlicht"," Adaptives Kurvenlicht"]';
let array = [
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
  "Abstandswarner",
  "Blendfreies Fernlicht",
  "Adaptives Kurvenlicht",
];

const checkBoxes = document.querySelector(".popUp__checkBoxes-row");
const createCheckboxes = (data) => {
  checkBoxes.innerHTML = "";
  const array = typeof data === "string" ? JSON.parse(data) : data;
  array.forEach((element, index) => {
    let input = document.createElement("div");
    input.classList.add("input");
    input.classList.add("input--checkBox");
    input.innerHTML = `
      <input  id="${index}"  type="checkbox">
      <label for="${index}">
      <span class="checkBox">
      </span>
      ${element}
        </label>
   `;
    checkBoxes.appendChild(input);
  });
};
createCheckboxes(array);

const tabsLink = document.querySelectorAll(".tabsLink");
const sections = document.querySelectorAll(".anchor");
function changeLinkState() {
  let index = sections.length;
  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
  tabsLink.forEach((link) => link.classList.remove("active"));
  tabsLink[index]?.classList.add("active");
}
tabsLink.forEach((e) => {
  // onLinkClick(e);
});

window.onscroll = function () {
  changeLinkState();
};

const siebarLinks = document.querySelectorAll(".sidebar__inner-link");
const sidebar = document.querySelector(".sidebar__inner");
siebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      body.classList.remove("active");
    } else {
      menu.classList.add("active");
      body.classList.add("active")
    }
  });
});
const sidebarClose = () => {
  menu.classList.remove("active");
};

window.onclick = function (event) {
  if (event.target == menu) {
    sidebarClose();
    closeMenu();
  }
};
