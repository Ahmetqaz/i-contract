const popUpBtn = document.getElementById("popUpBtn");
const popUp = document.getElementById("popUp");
const popupClose = document.getElementById("popupClose");
if (popUp) {
  popUpBtn.addEventListener("click", () => {
    popUp.classList.toggle("active");
    body.classList.toggle("active");
  });
  popupClose.addEventListener("click", () => {
    popUp.classList.toggle("active");
    body.classList.toggle("active");
  });
}

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
if (checkBoxes) {
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
}

const tabsLink = document.querySelectorAll(".tabsLink");
if (tabsLink) {
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
}

window.onscroll = function () {
  changeLinkState();
};

var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
var body = document.body;

const closeMenu = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("active");
  body.classList.remove("active");
  sidebarSwitch.classList.remove("active");
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
const siebarLinks = document.querySelectorAll(".sidebar__inner-link");
const sidebarSwitch = document.querySelector(".sidebar__inner-switch");
const sidebar = document.querySelector(".sidebar__inner");
sidebarSwitch.onclick = () => {
  const isActive = sidebarSwitch.classList.contains("active");
  menu.classList.toggle("active", !isActive);
  body.classList.toggle("active", !isActive);
  sidebarSwitch.classList.toggle("active", !isActive);
};
siebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      closeMenu();
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
const checkTable = document.getElementById("checkTable");
if (checkTable) {
  const tabContent = document.getElementById("tabContent");
  checkTable.addEventListener("change", () => {
    if (checkTable.checked === true) {
      tabContent.classList.add("active");
    } else {
      tabContent.classList.remove("active");
    }
  });
}

const stockCheckbox__footer = document.getElementById("stockCheckbox__footer");
if (stockCheckbox__footer) {
  const stockPagination = document.getElementById("stockPagination");
  const stockCheckbox = document.getElementById("stockCheckbox");
  const stockDropdown__button = document.querySelectorAll(
    ".stockDropdown__button"
  );

  stockCheckbox__footer.addEventListener("change", () => {
    if (stockCheckbox__footer.checked) {
      stockPagination.classList.add("_hide");
      stockCheckbox.checked = true;
      stockDropdown__button.forEach((button) => {
        button.setAttribute("disabled" , "") ;
      });
      console.log(stockDropdown__button)

    } else {
      stockPagination.classList.remove("_hide");
      stockCheckbox.checked = false;
      stockDropdown__button.forEach((button) => {
        button.removeAttribute("disabled");
      });
    }
  });
}

const tabBtn = document.querySelectorAll(".tabBtn");
if (tabBtn) {
  const tabEvent = document.querySelectorAll(".tabEvent");
  tabBtn.forEach((e) => {
    onTabClick(tabBtn, tabEvent, e);
  });
  function onTabClick(tabBtns, tabItems, item) {
    item.addEventListener("click", function (e) {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);
      if (currentBtn.classList.contains("active")) {
        console.log("now active");
        const faq = currentBtn.parentElement.querySelector(".tabEvent");
        if (faq) {
          faq.classList.remove("active");
          currentBtn.classList.remove("active");
        }
      } else if (!currentBtn.classList.contains("active")) {
        tabBtns.forEach(function (item) {
          item.classList.remove("active");
        });

        tabItems.forEach(function (item) {
          item.classList.remove("active");
        });
        currentBtn.classList.add("active");
        currentTab.classList.add("active");
      }
    });
  }
}
