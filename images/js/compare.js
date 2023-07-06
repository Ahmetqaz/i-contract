const mileageMin = 10000;
const mileageMax = 300000;
const registrationMonthMin = 1;
const registrationMonthMax = 12;
const registrationYearMin = 2000;
const registrationYearMax = 2023;

function getSVGs() {
  const svgs = document.querySelectorAll(".js-hidden-svg > svg");
  this.svgsObj = {};
  Array.from(svgs).forEach((item) => {
    let key = item.dataset.key;
    if (!key) return;
    this.svgsObj[key] = item;
    item.removeAttribute("data-key");
  });

  this.getSVG = (key) => {
    return this.svgsObj[key].cloneNode(true);
  };
}
const svgsObj = new getSVGs();
const disableForSec = (input) => {
  input.disabled = true;
  setTimeout(() => (input.disabled = false), 200);
};

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
  this.settingsList = document.querySelector("#filtersList");
  this.mileageFilters = document.querySelector("#mileageFilters");
  this.registrationFilters = document.querySelector("#registrationFilters");

  this.createMileageItem = (data, id) => {
    let min = mileageMin;
    let max = mileageMax;
    const wrapper = document.createElement("li");
    const checkbox = document.createElement("div");
    const doubleRange = document.createElement("div");
    const doubleRangeSlider = document.createElement("div");
    const doubleRangeInputs = document.createElement("div");
    wrapper.className = "filterBox__list-item";
    checkbox.className = "input input--checkBox";
    doubleRange.className = "doubleRange";
    doubleRangeSlider.className = "doubleRange__range";
    doubleRangeInputs.className = "doubleRange__inputs";

    checkbox.innerHTML =
      `<input type="checkbox" id="checkText-${id}" />` +
      `<label for="checkText-${id}"><span class="checkBox"> </span></label>`;
    doubleRangeSlider.innerHTML =
      `<input type="range" min="${min}" max="${max}" value="20"/>` +
      `<input type="range" min="${min}" max="${max}" value="20"/>`;
    doubleRangeInputs.innerHTML =
      `<div class="doubleRange__inputs-group"><label for="from-${id}">Wenn Laufleistung</label><div class="input input--border"><input type="number"  min="${min}" max="${max}"  id="from-${id}"/></div></div>` +
      `<div class="doubleRange__inputs-group"><label for="to-${id}">Vergleiche bis</label><div class="input input--border"><input type="number"  min="${min}" max="${max}"  id="to-${id}"/></div></div>`;
    doubleRange.append(doubleRangeSlider, doubleRangeInputs);
    wrapper.append(checkbox, doubleRange);

    const check = checkbox.querySelector("input");
    const rangeInputs = doubleRangeSlider.querySelectorAll("input");
    const numberInputs = doubleRangeInputs.querySelectorAll("input");

    check.checked = data.active;
    rangeInputs[0].value = data.von;
    rangeInputs[1].value = data.bis;
    numberInputs[0].value = data.von;
    numberInputs[1].value = data.bis;

    check.addEventListener("change", () => {
      data.active = check.checked;
    });

    const rangeMinChange = (event) => {
      if (parseInt(event.target.value) >= numberInputs[1].value - 1) {
        event.stopPropagation();
        event.preventDefault();
        disableForSec(event.target);
        data.bis =
          numberInputs[0].value =
          rangeInputs[0].value =
            parseInt(numberInputs[1].value) - 1;
        console.log("return min");

        return;
      }
      data.von = numberInputs[0].value = parseInt(rangeInputs[0].value);
    };
    const rangeMaxChange = (event) => {
      if (parseInt(event.target.value) <= numberInputs[0].value) {
        event.stopPropagation();
        event.preventDefault();
        disableForSec(event.target);
        data.bis =
          numberInputs[1].value =
          rangeInputs[1].value =
            parseInt(numberInputs[0].value) + 1;
        console.log("return max", numberInputs[0].value + 1);
        return;
      }
      data.bis = numberInputs[1].value = parseInt(rangeInputs[1].value);
    };
    rangeInputs[0].addEventListener("change", rangeMinChange);
    rangeInputs[0].addEventListener("input", rangeMinChange);
    rangeInputs[1].addEventListener("change", rangeMaxChange);
    rangeInputs[1].addEventListener("input", rangeMaxChange);
    numberInputs[0].addEventListener("blur", () => {
      if (parseInt(numberInputs[0].value) >= parseInt(numberInputs[1].value)) {
        rangeInputs[0].value = numberInputs[0].value = data.von;
        return;
      }
      data.von = rangeInputs[0].value = parseInt(numberInputs[0].value);
    });
    numberInputs[1].addEventListener("blur", () => {
      if (parseInt(numberInputs[0].value) >= parseInt(numberInputs[1].value)) {
        rangeInputs[1].value = numberInputs[1].value = data.bis;
        return;
      }
      data.bis = rangeInputs[1].value = parseInt(numberInputs[1].value);
    });
    return wrapper;
  };
  this.createRegistrationItem = (data, id) => {
    let min = mileageMin;
    let max = mileageMax;
    const wrapper = document.createElement("li");
    const checkbox = document.createElement("div");
    const doubleRange = document.createElement("div");
    const doubleRangeSlider1 = document.createElement("div");
    const doubleRangeSlider2 = document.createElement("div");
    const doubleRangeSliders = document.createElement("div");
    const doubleRangeInputs = document.createElement("div");
    wrapper.className = "filterBox__list-item";
    checkbox.className = "input input--checkBox";
    doubleRange.className = "doubleRange";
    doubleRangeSlider1.className = "doubleRange__range _sm";
    doubleRangeSlider2.className = "doubleRange__range _sm";
    doubleRangeSliders.className = "doubleRange__inputs";
    doubleRangeInputs.className = "doubleRange__inputs";

    checkbox.innerHTML =
      `<input type="checkbox" id="checkText-${id}" />` +
      `<label for="checkText-${id}"><span class="checkBox"> </span></label>`;
    doubleRangeSlider1.innerHTML = `<input type="range" min="${registrationMonthMin}" max="${registrationMonthMax}" value="${data.first_reg_month}"/>`;
    doubleRangeSlider2.innerHTML = `<input type="range" min="${registrationYearMin}" max="${registrationYearMax}" value="${data.compare_with_year}"/>`;
    doubleRangeInputs.innerHTML =
      `<div class="doubleRange__inputs-group"><label for="from-${id}">Wenn Laufleistung</label><div class="input input--border"><input type="number"  min="${min}" max="${max}"  id="from-${id}"/></div></div>` +
      `<div class="doubleRange__inputs-group"><label for="to-${id}">Vergleiche bis</label><div class="input input--border"><input type="number"  min="${min}" max="${max}"  id="to-${id}"/></div></div>`;
    doubleRangeSliders.append(doubleRangeSlider1, doubleRangeSlider2);
    doubleRange.append(doubleRangeSliders, doubleRangeInputs);
    wrapper.append(checkbox, doubleRange);

    const check = checkbox.querySelector("input");
    const rangeInputs = doubleRangeSliders.querySelectorAll("input");
    const numberInputs = doubleRangeInputs.querySelectorAll("input");

    check.checked = data.active;
    rangeInputs[0].value = data.von;
    rangeInputs[1].value = data.bis;
    numberInputs[0].value = data.von;
    numberInputs[1].value = data.bis;

    check.addEventListener("change", () => {
      data.active = check.checked;
    });

    const rangeMonthChange = (event) => {
      data.first_reg_month = numberInputs[0].value = parseInt(rangeInputs[0].value);
    };
    const rangeYearChange = (event) => {
      data.compare_with_year = numberInputs[1].value = parseInt(rangeInputs[1].value);
    };
    rangeInputs[0].addEventListener("change", rangeMonthChange);
    rangeInputs[0].addEventListener("input", rangeMonthChange);
    rangeInputs[1].addEventListener("change", rangeYearChange);
    rangeInputs[1].addEventListener("input", rangeYearChange);
    numberInputs[0].addEventListener("blur", () => {
      if (parseInt(numberInputs[0].value) >= parseInt(numberInputs[1].value)) {
        rangeInputs[0].value = numberInputs[0].value = data.von;
        return;
      }
      data.von = rangeInputs[0].value = parseInt(numberInputs[0].value);
    });
    numberInputs[1].addEventListener("blur", () => {
      if (parseInt(numberInputs[0].value) >= parseInt(numberInputs[1].value)) {
        rangeInputs[1].value = numberInputs[1].value = data.bis;
        return;
      }
      data.bis = rangeInputs[1].value = parseInt(numberInputs[1].value);
    });
    return wrapper;
  };
  this.generateFilters = (data = this.data["Inland"]) => {
    this.mileageFilters.innerHTML = "";
    this.registrationFilters.innerHTML = "";
    data.car_mileage.forEach((element, index) => {
      this.mileageFilters.appendChild(
        this.createMileageItem(element, `milieage-${index}`)
      );
    });
    data.first_registration.forEach((element, index) => {
      this.registrationFilters.appendChild(
        this.createRegistrationItem(element, `registration-${index}`)
      );
    });
  };
  this.createSettingsList = (data = this.data) => {
    const filters = Object.keys(data);
    console.log("filters", filters);
    this.settingsList.innerHTML = "";

    filters.forEach((filter) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("div");
      checkbox.className = "input input--checkBox";
      checkbox.innerHTML = `<input type="radio" name="filter" id="${filter}" /><label for="${filter}"><span class="checkBox"></span>${filter}</label>`;

      const buttonEdit = document.createElement("button");
      const buttonDelete = document.createElement("button");

      buttonEdit.className = "button button--ico";
      buttonDelete.className = "button button--ico _danger";
      buttonEdit.appendChild(svgsObj.getSVG("pen"));
      buttonDelete.appendChild(svgsObj.getSVG("bin"));

      li.append(checkbox, buttonEdit, buttonDelete);
      this.settingsList.appendChild(li);
    });
  };
  this.initAll = (data = this.data) => {
    this.createSettingsList(data);
    this.generateFilters();
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
