const mileageMin = 10000;
const mileageMax = 300000;
const registrationMonthMin = 1;
const registrationMonthMax = 12;
const registrationYearMin = -1;
const registrationYearMax = 2;

const EMPTY_MILEAGE_DATA = {
  von: mileageMin,
  bis: mileageMax,
  active: true,
};
const EMPTY_REGISTRATION_DATA = {
  first_reg_month: registrationMonthMin,
  compare_with_year: registrationYearMin,
  active: true,
};

const EMPTY_FILTERS_DATA = {
  active: false,
  car_mileage: [{ ...EMPTY_MILEAGE_DATA }],
  first_registration: [{ ...EMPTY_REGISTRATION_DATA }],
};

function DataController() {
  this.techConfigData = null;
  this.equipmentConfigData = null;
  this.filterConfigData = null;

  this.storeAll = () => {
    let newJSONData = JSON.stringify({
      compare_settings: {
        tech_data: this.techConfigData,
        car_features: this.equipmentConfigData,
        filters: this.filterConfigData,
      },
    });
    console.log(JSON.parse(newJSONData));
  };
  this.update = (obj) => {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
    this.storeAll();
  };
  this.setConfigData = ({ compare_settings }) => {
    this.techConfigData = compare_settings.tech_data;
    this.equipmentConfigData = compare_settings.car_features;
    this.filterConfigData = compare_settings.filters;
  };
  this.setData = ({ tech_data, car_features }) => {
    this.techData = tech_data;
    this.equipmentData = car_features;
  };
}
const dataController = new DataController();

function ConfirmPopup(params) {
  const default_params = {
    title: "Confirm Popup",
    cancelButtonText: "Cancel this",
    saveButtonText: "Save",
    showInput: false,
    inputPlaceholder: "",
  };

  const popupElement = document.getElementById("confirmPopup");
  const titleElement = popupElement.querySelector(".popUp__inner-title > h3");
  const content = popupElement.querySelector(".popUp__inner-content");
  const cancelButton = popupElement.querySelector(
    `[data-event="cancel-prompt"]`
  );
  const saveButton = popupElement.querySelector(`[data-event="save-prompt"]`);
  this.showPopup = () => {
    document.body.classList.add("active");
    popupElement.classList.add("active");
  };
  this.hidePopup = () => {
    document.body.classList.remove("active");
    popupElement.classList.remove("active");
  };
  this.fire = (params) => {
    const {
      title,
      para,
      showInput,
      inputPlaceholder,
      cancelButtonText,
      saveButtonText,
      onCancel,
      onSave,
    } = {
      ...default_params,
      ...params,
    };
    titleElement.innerText = title;
    cancelButton.innerText = cancelButtonText;
    saveButton.innerText = saveButtonText;

    content.innerHTML = "";
    if (para) content.innerHTML += `<p>${para}</p>`;
    if (showInput)
      content.innerHTML += `<div class="input input--text"><input type="text" id="confirm-input" placeholder="${inputPlaceholder}" /></div>`;

    this.showPopup();

    cancelButton.onclick = () => {
      this.hidePopup();
      if (onCancel) onCancel();
    };
    saveButton.onclick = () => {
      const input = content.querySelector("#confirm-input");
      this.hidePopup();
      if (onSave) onSave(input ? input.value : null);
    };
  };
}
const confirmBox = new ConfirmPopup();

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

function TechListUI(configData) {
  this.wrapper = document.querySelector("#techList");
  this.popupWrapper = document.querySelector("#techListPopup");
  this.popup = document.querySelector("#techListSettings");
  this.saveButton = document.querySelector("#updateTechListPopup");

  this.configData = configData;
  this.storeConfig = () => {
    const checkBoxes = this.popup.querySelectorAll(
      'input[id^="tech-settings"]'
    );
    const newData = Array.from(checkBoxes).map((checkbox) => ({
      key: checkbox.dataset?.key ?? "",
      name: checkbox.dataset?.name ?? "",
      active: checkbox.checked,
    }));
    dataController.update({ techConfigData: newData });
    this.initList(newData);
  };
  this.popupClose = () => {
    this.popupWrapper.classList.remove("active");
    document.body.classList.remove("active");
  };
  this.createTechConfigItem = (data) => {
    const wrapper = document.createElement("div");
    wrapper.className = "input input--checkBox";
    wrapper.innerHTML =
      `<input type="checkbox" id="tech-settings-${data.key.toLowerCase()}" ` +
      `data-name="${data.name}" data-key="${data.key}">` +
      `<label for="tech-settings-${data.key.toLowerCase()}">` +
      `<span class="checkBox"></span>${data.name}</label>`;

    const check = wrapper.querySelector(`input`);
    check.checked = data.active;

    return wrapper;
  };
  this.createTechItem = (data) => {
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("div");
    const text = document.createElement("div");

    wrapper.className = "input input--checkText";
    checkbox.className = "input input--checkBox";
    text.className = "input input--text";

    checkbox.innerHTML =
      `<input type="checkbox" id="${
        data.key
      }-check" data-key="${data.key.toLowerCase()}">` +
      `<label for="${data.key}-check"><span class="checkBox"></span></label>`;
    text.innerHTML = `<label for="${data.key}">${data.name}</label><input type="text" id="${data.key}">`;
    wrapper.append(checkbox, text);
    const check = checkbox.querySelector(`#${data.key}-check`);
    const input = text.querySelector(`#${data.key}`);
    check.checked = data.active;

    // check.onchange = (e) => {
    //   data.active = e.target.checked;
    // };
    // input.onchange = (e) => {
    //   data.value = e.target.value;
    // };
    return wrapper;
  };
  this.initList = (configData) => {
    this.configData = configData;
    this.wrapper.innerHTML = "";
    this.popup.innerHTML = "";
    this.configData.forEach((element) => {
      this.wrapper.appendChild(this.createTechItem(element));
      this.popup.appendChild(this.createTechConfigItem(element));
    });
    this.saveButton.onclick = () => {
      this.popupClose();
      this.storeConfig();
    };
  };
  this.updateData = (data) => {
    // this.wrapper.querySelectorAll();
    data.forEach((itemData) => {
      const item = document.getElementById(itemData.key);
      if (!item) {
        console.log(`Item not found - ${itemData.key}`);
        return;
      }

      item.value = itemData.value;
    });
  };

  this.getData = () => this.configData;
  this.initList(configData);
}
function CarEquipmentUI({ equipmentConfigData, equipmentData }) {
  this.wrapper = document.querySelector("#carEquipment");
  this.popupInner = document.querySelector("#carEquipments");

  this.data = equipmentData;
  this.dataStates = [];

  this.settingsData = ((settingsData) => {
    return [...settingsData]
      .filter((item) => item.status)
      .map((item) => item.name);
  })(equipmentConfigData);

  this.checkState = (name) => {
    return this.settingsData.indexOf(name) >= 0;
  };
  this.createTechItem = (data, onChange) => {
    const wrapper = document.createElement("div");
    wrapper.className = "input input--checkBox _orange";
    wrapper.innerHTML =
      `<input type="checkbox" id="${data.toLowerCase()}">` +
      `<label for="${data.toLowerCase()}"><span class="checkBox"></span>${data}</label>`;

    const check = wrapper.querySelector(`input`);
    check.checked = this.checkState(data);

    check.onchange = (e) => {
      onChange(e.target.checked);
    };
    return wrapper;
  };

  this.initList = (data) => {
    this.data = data;
    this.dataStates = [];
    this.wrapper.innerHTML = "";
    this.popupInner.innerHTML = "";

    this.data.forEach((element, index) => {
      this.dataStates[index] = this.checkState(data);

      const onChange = (checked) => {
        this.dataStates[index] = checked;

        listItem.querySelector('input[type="checkbox"]').checked = checked;
        popupItem.querySelector('input[type="checkbox"]').checked = checked;
      };

      let listItem = this.createTechItem(element, onChange);
      let popupItem = this.createTechItem(element, onChange);

      this.wrapper.appendChild(listItem);
      this.popupInner.appendChild(popupItem);
    });
  };

  this.getData = () => this.data;
  this.initList(this.data);
}
function CarEquipmentsConfigUI(data) {
  this.wrapper = document.querySelector("#carAllEquipments");
  const carEquipmentAllPopup = document.querySelector("#carEquipmentAllPopup");
  const updateCarAllEquipments = document.querySelector(
    "#updateCarAllEquipments"
  );

  this.data = data;
  this.createEquipmentConfigItem = (data) => {
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
      this.wrapper.appendChild(this.createEquipmentConfigItem(element));
    });

    updateCarAllEquipments.onclick = () => {
      dataController.update({
        equipmentConfigData: this.data,
      });
      carEquipmentAllPopup.classList.remove("active");
    };
  };
  this.getData = () => this.data;
  this.initList(data);
}
function FilterConfigPopupUI() {
  this.data = null;
  this.mileageFilters = document.querySelector("#mileageFilters");
  this.registrationFilters = document.querySelector("#registrationFilters");
  this.mileageFiltersActions = document.querySelector("#mileageFiltersActions");
  this.registrationFiltersActions = document.querySelector(
    "#registrationFiltersActions"
  );
  this.popup = document.getElementById("filterPopup");
  this.saveFilterBtn = document.querySelector("#saveFilter");

  this.generateKey = (title = "new") => {
    return `${title}-${Date.now()}`;
  };
  this.setData = (data) => {
    if (!data.car_mileage || !data.first_registration) {
      console.log("bad data type ", data);
      return null;
    }

    let newData = {
      ...data,
      car_mileage: data.car_mileage.map((item, index) => ({
        ...item,
        tempkey: `${index}-${this.generateKey("mileage")}`,
      })),
      first_registration: data.first_registration.map((item, index) => ({
        ...item,
        tempkey: `${index}-${this.generateKey("registration")}`,
      })),
    };
    this.data = newData;
    return newData;
  };
  this.showPopup = () => {
    document.body.classList.add("active");
    this.popup.classList.add("active");
  };
  this.hidePopup = () => {
    document.body.classList.remove("active");
    this.popup.classList.remove("active");
  };
  this.removeItem = ({ key, itemType, domElement }) => {
    this.data[itemType] = this.data[itemType].filter(
      (item) => item.tempkey !== key
    );
    domElement.remove();
  };

  this.createMileageItem = (data) => {
    let tempKey = data.tempkey;
    let min = mileageMin;
    let max = mileageMax;
    const wrapper = document.createElement("li");
    const wrapperGroup = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const checkbox = document.createElement("div");
    const doubleRange = document.createElement("div");
    const doubleRangeSlider = document.createElement("div");
    const doubleRangeInputs = document.createElement("div");
    wrapper.className = "filterBox__list-item";
    wrapperGroup.className = "filterBox__list-item-group";
    checkbox.className = "input input--checkBox";
    deleteBtn.className = "button button--ico _danger";
    deleteBtn.type = "button";
    doubleRange.className = "doubleRange";
    doubleRangeSlider.className = "doubleRange__range";
    doubleRangeInputs.className = "doubleRange__inputs";

    deleteBtn.append(svgsObj?.getSVG("bin") ?? "del");
    checkbox.innerHTML =
      `<input type="checkbox" id="checkText-${tempKey}" />` +
      `<label for="checkText-${tempKey}"><span class="checkBox"> </span></label>`;
    doubleRangeSlider.innerHTML =
      `<input type="range" min="${min}" max="${max}" value="20"/>` +
      `<input type="range" min="${min}" max="${max}" value="20"/>`;
    doubleRangeInputs.innerHTML =
      `<div class="doubleRange__inputs-group"><label for="from-${tempKey}">Wenn Laufleistung</label><div class="input input--border"><input type="number"  min="${min}" max="${max}"  id="from-${tempKey}"/></div></div>` +
      `<div class="doubleRange__inputs-group"><label for="to-${tempKey}">Vergleiche bis</label><div class="input input--border"><input type="number"  min="${min}" max="${max}"  id="to-${tempKey}"/></div></div>`;
    doubleRange.append(doubleRangeSlider, doubleRangeInputs);
    wrapperGroup.append(checkbox, deleteBtn);
    wrapper.append(wrapperGroup, doubleRange);

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
    deleteBtn.onclick = () =>
      this.removeItem({
        key: tempKey,
        itemType: "car_mileage",
        domElement: wrapper,
      });

    new RangeInput({
      min: data.von,
      max: data.bis,
      rangeInputMin: rangeInputs[0],
      rangeInputMax: rangeInputs[1],
      numberInputMin: numberInputs[0],
      numberInputMax: numberInputs[1],
      onMinChange: (value) => {
        data.von = value;
      },
      onMaxChange: (value) => {
        data.bis = value;
      },
    });
    return wrapper;
  };
  this.createRegistrationItem = (data) => {
    let tempKey = data.tempkey;
    const wrapper = document.createElement("li");
    const checkbox = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const doubleRange = document.createElement("div");
    const doubleRangeSlider1 = document.createElement("div");
    const doubleRangeSlider2 = document.createElement("div");
    const doubleRangeSliders = document.createElement("div");
    const doubleRangeInputs = document.createElement("div");
    wrapper.className = "filterBox__list-item";
    checkbox.className = "input input--checkBox";
    deleteBtn.className = "button button--ico _danger";
    deleteBtn.type = "button";
    doubleRange.className = "doubleRange";
    doubleRangeSlider1.className = "doubleRange__range _sm";
    doubleRangeSlider2.className = "doubleRange__range _sm";
    doubleRangeSliders.className = "doubleRange__inputs";
    doubleRangeInputs.className = "doubleRange__inputs";

    checkbox.innerHTML =
      `<input type="checkbox" id="checkText-${tempKey}" />` +
      `<label for="checkText-${tempKey}"><span class="checkBox"> </span></label>`;
    deleteBtn.append(svgsObj?.getSVG("bin") ?? "del");

    doubleRangeSlider1.innerHTML = `<input type="range" min="${registrationMonthMin}" max="${registrationMonthMax}" />`;
    doubleRangeSlider2.innerHTML = `<input type="range" min="${registrationYearMin}" max="${registrationYearMax}" />`;
    doubleRangeInputs.innerHTML =
      `<div class="doubleRange__inputs-group">
      <label for="month-input-${tempKey}">Wenn Laufleistung</label>
      <div class="input nput--border">
      <input type="number"  min="${registrationMonthMin}" max="${registrationMonthMax}"  id="month-input-${tempKey}"/>
      </div></div>` +
      `<div class="doubleRange__inputs-group"><label for="year-input-${tempKey}">Vergleiche bis</label><div class="input input--border"><input type="number"  min="${registrationYearMin}" max="${registrationYearMax}"  id="year-input-${tempKey}"/></div></div>`;
    doubleRangeSliders.append(doubleRangeSlider1, doubleRangeSlider2);
    doubleRange.append(doubleRangeSliders, doubleRangeInputs);
    wrapper.append(checkbox, doubleRange, deleteBtn);

    const check = checkbox.querySelector("input");
    const rangeInputs = doubleRangeSliders.querySelectorAll("input");
    const numberInputs = doubleRangeInputs.querySelectorAll("input");

    check.checked = data.active;
    rangeInputs[0].value = data.first_reg_month;
    rangeInputs[1].value = data.compare_with_year;
    numberInputs[0].value = data.first_reg_month;
    numberInputs[1].value = data.compare_with_year;

    check.addEventListener("change", () => {
      data.active = check.checked;
    });
    deleteBtn.onclick = () =>
      this.removeItem({
        key: tempKey,
        itemType: "first_registration",
        domElement: wrapper,
      });

    const rangeMonthChange = (event) => {
      data.first_reg_month = numberInputs[0].value = parseInt(
        rangeInputs[0].value
      );
    };
    const rangeYearChange = (event) => {
      data.compare_with_year = numberInputs[1].value = parseInt(
        rangeInputs[1].value
      );
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
  this.setFilterListActions = ({
    data,
    wrapper,
    actionsWrapper,
    isMileage,
  }) => {
    const addButton = actionsWrapper.querySelector('[data-event="add-one"]');
    const deleteAllButton = actionsWrapper.querySelector(
      '[data-event="delete-all"]'
    );
    let index = data.length;

    addButton.onclick = () => {
      if (isMileage) {
        data.push({
          ...EMPTY_MILEAGE_DATA,
          tempkey: `${index}-${this.generateKey("mileage")}`,
        });
        wrapper.append(this.createMileageItem(data[index]));
      } else {
        data.push({
          ...EMPTY_REGISTRATION_DATA,
          tempkey: `${index}-${this.generateKey("registration")}`,
        });
        wrapper.append(this.createRegistrationItem(data[index]));
      }
    };

    deleteAllButton.onclick = () => {
      wrapper.innerHTML = "";
      if (isMileage) this.data.car_mileage = [];
      else this.data.first_registration = [];
    };
  };
  this.generateList = ({ wrapper, dataArray, createItem }) => {
    wrapper.innerHTML = "";
    dataArray.map((element) => {
      let item = createItem(element);
      wrapper.appendChild(item);
    });
  };
  this.initList = ({ data, onSave }) => {
    if (!data || !this.setData(data)) {
      console.log("data not provided ", data);
      return;
    }

    this.generateList({
      wrapper: this.mileageFilters,
      dataArray: this.data.car_mileage,
      createItem: this.createMileageItem,
    });
    this.generateList({
      wrapper: this.registrationFilters,
      dataArray: this.data.first_registration,
      createItem: this.createRegistrationItem,
    });

    this.setFilterListActions({
      wrapper: this.mileageFilters,
      actionsWrapper: this.mileageFiltersActions,
      data: this.data.car_mileage,
      isMileage: true,
    });
    this.setFilterListActions({
      wrapper: this.registrationFilters,
      actionsWrapper: this.registrationFiltersActions,
      data: this.data.first_registration,
    });

    this.saveFilterBtn.onclick = () => {
      onSave(this.data);
      this.hidePopup();
    };
  };
}
function FilterListUI(data) {
  this.data = data;

  this.settingsList = document.querySelector("#filtersList");
  this.addFilterBtn = document.getElementById("addFilter");
  this.popupUI = new FilterConfigPopupUI();

  this.storeData = () => {
    dataController.update({
      filterConfigData: this.data,
    });
  };

  this.createSettingsList = (data = this.data) => {
    const filters = Object.keys(data);
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
      const checkInput = checkbox.querySelector("input");

      checkInput.onchange = ({ target }) => {
        data[filter].active = target.checked;
        Object.keys(data).forEach((key) => {
          data[key].active = key === filter && target.checked;
        });
        this.storeData();
      };
      checkInput.checked = data[filter].active;
      buttonDelete.onclick = () => {
        li.remove();
        delete data[filter];
        this.storeData();
      };
      buttonEdit.onclick = () => {
        this.popupUI.initList({
          data: data[filter],
          onSave: (newData) => {
            data[filter] = newData;
          },
        });
        this.popupUI.showPopup();
      };
      this.settingsList.appendChild(li);
    });
  };
  this.initAll = (data = this.data) => {
    this.createSettingsList(data);

    this.addFilterBtn.onclick = () => {
      confirmBox.fire({
        para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim at sunt repudiandae eligendi.",
        showInput: true,
        inputPlaceholder: "type here",
        onSave: (value) => {
          if (!value || value === "" || this.data[value]) return;

          this.data[value] = { ...EMPTY_FILTERS_DATA };
          this.createSettingsList(this.data);

          this.storeData();
          this.popupUI.initList({
            data: this.data[value],
            onSave: (newData) => {
              this.data[value] = newData;
              this.storeData();
            },
          });
          this.popupUI.showPopup();
        },
      });
    };
  };

  this.initAll();
}

let techList = null;
let equipmentList = null;
let equipmentConfigList = null;
let filterListUI = null;

const fetchData = async ({ url, onSuccess }) => {
  const response = await fetch(url);
  if (!response.ok)
    // check if response worked (no 404 errors etc...)
    console.log("error fetchinf data");

  const data = await response.json(); // get JSON from the response
  if (data && onSuccess) onSuccess(data);
  return data; // returns a promise, which resolves to this data value
};
const loadConfiguration = async (jsonData) => {
  if (!jsonData) {
    await fetchData({
      url: "./data/init.json",
      onSuccess: (data) => dataController.setConfigData(data),
    });
  } else {
    dataController.setConfigData(JSON.parse(jsonData));
  }

  techList = new TechListUI(dataController.techConfigData);
  equipmentConfigList = new CarEquipmentsConfigUI(
    dataController.equipmentConfigData
  );
  filterListUI = new FilterListUI(dataController.filterConfigData);
};
const loadCarData = async (jsonData) => {
  if (!jsonData) {
    await fetchData({
      url: "./data/data.json",
      onSuccess: (data) => dataController.setData(data),
    });
  } else {
    dataController.setData(JSON.parse(jsonData));
  }

  equipmentList = new CarEquipmentUI({
    equipmentConfigData: dataController.equipmentConfigData,
    equipmentData: dataController.equipmentData,
  });
  techList.updateData(dataController.techData);
};
loadConfiguration();
loadCarData();
