function TechListUI(data) {
  this.wrapper = document.querySelector("#techList");
  this.data = data;
  this.createTechItem = (data) => {
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("div");
    const text = document.createElement("div");

    wrapper.className = "input input--checkText";
    checkbox.className = "input input--checkBox";
    text.className = "input input--text";

    checkbox.innerHTML =
      `<input type="checkbox" id="${data.key}-check">` +
      `<label for="${data.key}-check"><span class="checkBox"></span></label>`;
    text.innerHTML = `<label for="${data.key}">${data.name}</label><input type="text" id="${data.key}">`;
    wrapper.append(checkbox, text);
    const check = checkbox.querySelector(`#${data.key}-check`);
    const input = text.querySelector(`#${data.key}`);
    check.checked = data.active;

    check.onchange = (e) => {
      data.active = e.target.checked;
    };
    input.onchange = (e) => {
      data.value = e.target.value;
    };
    return wrapper;
  };
  this.initList = (data) => {
    this.data = data;
    this.wrapper.innerHTML = "";
    this.data.forEach((element) => {
      this.wrapper.appendChild(this.createTechItem(element));
    });
  };
  this.getData = () => this.data;
  this.initList(data);
}
function CarEquipmentUI(data) {
  this.wrapper = document.querySelector("#carEquipment");
  this.data = data;
  this.createTechItem = (data) => {
    const wrapper = document.createElement("div");
    wrapper.className = "input input--checkBox _orange";
    wrapper.innerHTML =
      `<input type="checkbox" id="${data.toLowerCase()}">` +
      `<label for="${data.toLowerCase()}"><span class="checkBox"></span>${data}</label>`;

    const check = wrapper.querySelector(`input`);
    check.checked = true;

    check.onchange = (e) => {
      //   data.active = e.target.checked;
    };
    return wrapper;
  };
  this.initList = (data) => {
    this.data = data;
    this.wrapper.innerHTML = "";
    this.data.forEach((element) => {
      this.wrapper.appendChild(this.createTechItem(element));
    });
  };

  this.getData = () => this.data;
  this.initList(data);
}
function CarAllEquipmentsUI(data) {
  this.wrapper = document.querySelector("#carAllEquipments");
  this.data = data;
  this.createTechItem = (data) => {
    const wrapper = document.createElement("div");
    wrapper.className = "input input--checkBox";
    wrapper.innerHTML =
      `<input type="checkbox" id="settings-${data.name.toLowerCase()}">` +
      `<label for="settings-${data.name.toLowerCase()}"><span class="checkBox"></span>${
        data.name
      }</label>`;

    const check = wrapper.querySelector(`input`);
    check.checked = data.status;

    check.onchange = (e) => {
      data.status = e.target.checked;
    };
    return wrapper;
  };
  this.initList = (data) => {
    this.data = data;
    this.wrapper.innerHTML = "";
    this.data.forEach((element) => {
      this.wrapper.appendChild(this.createTechItem(element));
    });
  };
  this.getData = () => this.data;
  this.initList(data);
}
function FilterListUI(data) {
  this.data = data;
  this.filtersList = document.querySelector("#filtersList");

  this.createLists = (data = this.data) => {
    const filters = Object.keys(data);
    console.log("filters", filters);
    this.filtersList.innerHTML = "";
  };
  this.initAll = (data = this.data) => {
    this.createLists(data);
  };
  this.initAll();
}

let techList = null;
let equipmentList = null;
let equipmentAllList = null;
let filterListUI = null;

const fetchTechData = async ({ url, onSuccess }) => {
  const response = await fetch(url);
  if (!response.ok)
    // check if response worked (no 404 errors etc...)
    console.log("error fetchinf data");

  const data = await response.json(); // get JSON from the response
  if (data && onSuccess) onSuccess(data);
  return data; // returns a promise, which resolves to this data value
};
const fetchEquipmentData = async ({ url, onSuccess }) => {
  const response = await fetch(url);
  if (!response.ok)
    // check if response worked (no 404 errors etc...)
    console.log("error fetchinf data");

  const data = await response.json(); // get JSON from the response
  if (data && onSuccess) onSuccess(data);
  return data; // returns a promise, which resolves to this data value
};

const fetchAll = async () => {
  let techData;
  let equipmentData;
  let filterData;
  let equipmentAllData;

  await fetchTechData({
    url: "./data/tech_data.json",
    onSuccess: (data) => (techData = data.tech_data),
  });
  await fetchTechData({
    url: "./data/car_features_settings.json",
    onSuccess: (data) => (equipmentAllData = data.car_features),
  });
  await fetchTechData({
    url: "./data/car_features.json",
    onSuccess: (data) => (equipmentData = data.car_features),
  });
  await fetchTechData({
    url: "./data/filter.json",
    onSuccess: (data) => (filterData = data.filters),
  });
  techList = new TechListUI(techData);
  equipmentList = new CarEquipmentUI(equipmentData);
  equipmentAllList = new CarAllEquipmentsUI(equipmentAllData);
  filterListUI = new FilterListUI(filterData);
};
fetchAll();

const carEquipmentPopup = document.querySelector("#carEquipmentPopup");
const updateCarEquipments = document.querySelector("#updateCarEquipments");
updateCarEquipments.onclick = () => {
  const activeData = equipmentAllList
    .getData()
    .filter((item) => item.status)
    .map((item) => item.name);
  equipmentList.initList(activeData);
  carEquipmentPopup.classList.remove("active");
};
