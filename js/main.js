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
window.onclick = function (event) {
  if (event.target == menu) {
    closeMenu();
  }
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

///
///
/// slick slider

///
///
/// tabEvents
// const toggleBody = (isClosed) => {
//   if (isClosed) {
//     document.body.classList.add("active");
//     if (menu) closeMenu();
//   } else {
//     document.body.classList.remove("active");
//   }
// };
// document.querySelectorAll(`[data-event="tabEvent"]`).forEach((eventBtn) => {
//   const tab = document.querySelector(eventBtn.getAttribute("data-tab"));
//   if (tab) {
//     eventBtn.onclick = (e) => {
//       e.preventDefault();
//       tab.classList.toggle("active");
//       toggleBody(tab.classList.contains("active"));
//     };
//     tab.onclick = (e) => {
//       if (e.target === e.currentTarget) {
//         tab.classList.toggle("active");
//         toggleBody(tab.classList.contains("active"));
//       }
//     };
//   }
// });
// document.querySelectorAll(`[data-toggle]`).forEach((toggleBtn) => {
//   console.log("btn ->");
//   toggleBtn.onclick = () =>
//     toggleBtn.classList.toggle(toggleBtn.getAttribute("data-toggle"));
// });
///
///
///
///WOW JS
// new WOW().init({
//   boxClass: "wow",
// });

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

const checkBoxes = document.querySelector(".popUp__checkBoxes-row")
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
createCheckboxes(array)



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