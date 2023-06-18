const copyBtn = document.getElementById("copyBtn");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const confirmPopup = document.getElementById("confirm");
const searchPopup = document.getElementById("search");
const popups = document.querySelectorAll(".popUp");

const copy = (text) => {
  const showCopyText = (text) => {
    console.log(text);
  };

  if (navigator.clipboard !== undefined) {
    //Chrome
    navigator.clipboard.writeText(text).then(
      () => showCopyText("Copied"),
      (err) => console.error("Async: Could not copy text: ", err)
    );
  } else if (window.clipboardData) {
    // Internet Explorer
    window.clipboardData.setData("Text", text);
  } else {
    showCopyText("Error: not secure");
  }
};

copyBtn.onclick = () => {
  copy(searchInput.value);
};
clearBtn.onclick = () => {
  searchInput.value = "";
};
searchInput.addEventListener(
  "contextmenu",
  (ev) => {
    ev.preventDefault();
    console.log("right click");
    if (navigator.clipboard !== undefined) {
      //Chrome
      navigator.clipboard.readText().then(
        (text) => (searchInput.value = text),
        (err) => console.error("Async: Could not copy text: ", err)
      );
    }
  },
  false
);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    searchPopup.classList.add("active");
  }
});
popups.forEach((element) => {
  element.onclick = ({ target }) => {
    target === element && element.classList.remove("active");
  };
});
document.querySelectorAll('[data-event="close-modal"]').forEach((element) => {
  element.onclick = () => {
    document.querySelector(element.dataset.modal).classList.remove("active");
  };
});

const initCarList = (initData) => {
  const onDelete = (data) => {
    confirmPopup.classList.add("active");
    document.querySelector("#confirm-btn").onclick = () => {
      document.querySelector(`#item-${data.id}`).remove();
      confirmPopup.classList.remove("active");
    };
  };
  const onSearch = (data) => {
    console.log("search button for => ", data.id);
  };
  const onCall = (data) => {
    console.log("search button for => ", data.id);
  };

  const carList = new CarList({
    data: initData,
    wrapper: document.querySelector("#carList"),
    onDelete,
    onSearch,
    onCall,
  });
  return carList;
};

//Test
const jsonString =
  '[{"id": 101,"img": "./images/car.png","nameLong": "Mercedes-Benz B 200 AMG Line Navu Kamera PTS Spur Klima","price": 10000,"price2": 10000,"rating": 2,"info": "Ez 03/2022, 16,160 km, 120 kW (163 Ps)\\n Benzin, Schaltgetrible"}]';
const newCarJson =
  '{"id": 106,"img": "./images/car.png","nameLong": "Prepended: Audi A3 Sportback","price": 15000,"price2": 15000,"rating": 4,"info": "Ez 04/2022, 14,500 km, 110 kW (150 PS) \\n Benzin, Schaltgetrible"}';

const carList = initCarList(jsonString);
carList.prependListItem(newCarJson);

//available funtion within carList obj
// carList.getList()   // props obj:var JSON(string) || array
// carList.generateRating()  // props rating(number), parentElement(dome element) to append
// carList.createListItem()  // props obj, returns listItem dom element
// carList.createListItems() // props arr[obj], returns listItem dom elements
// carList.appendListItem()  // props obj appends new item to the end of list
// carList.prependListItem() // props obj appends new item to the start of list
// carList.createListItems() // it is like init func deletes all list items and creates again according to json or arr[obj]
