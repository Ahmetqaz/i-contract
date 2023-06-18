function CarList({ data, wrapper, onDelete, onSearch, onCall }) {
  this.list = data;
  if (typeof data === "string") this.list = JSON.parse(data);

  this.getList = () => this.list;
  this.generateRating = (rating, parentNode) => {
    let className =
      rating <= 1
        ? "rating--danger" // if <=1
        : rating <= 3
        ? "rating--warning" // if <=3
        : "rating--success"; // else

    parentNode.className = `rating ${className}`;

    for (let i = 1; i <= 5; i++) {
      parentNode.innerHTML +=
        // add badge
        `<div class="rating-shape ${i <= rating ? "_filled" : ""}"></div>`;
    }
  };
  this.createListItem = (data) => {
    //create wrapper
    const item = document.createElement("div");
    item.className = "carList__item";
    item.id = `item-${data.id}`;
    item.innerHTML += `<div class="carList__item-image"><img src="${data.img}" alt="" /></div>`;

    //create body
    const itemBody = document.createElement("div");
    itemBody.className = "carList__item-body";

    //add contetnt
    const itemBodyInfo = document.createElement("div");
    itemBodyInfo.className = "carList__item-body-info";
    itemBodyInfo.innerHTML += `<h2>${data.nameLong}</h2>`;
    itemBodyInfo.innerHTML +=
      `<div class="carList__item-body-group">` +
      `<h6>Preis: ${data.price} E<span>&rarr; Handler-Ek: ${data.price2} E</span></h6>` +
      `<div class="rating "></div></div>`;

    const para = document.createElement("p");
    para.innerText = data.info;
    itemBodyInfo.append(para);

    //add buttons
    const itemFooter = document.createElement("div");
    itemFooter.className = "carList__item-body-box";

    const deleteButton = document.createElement("button");
    deleteButton.className = "carList__item-delete button button--ico";
    deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    const searchButton = document.createElement("button");
    searchButton.className = "button button--secondary";
    searchButton.innerHTML = `<i class="fas fa-search"></i><span class="text"> Suchen </span>`;

    const callButton = document.createElement("button");
    callButton.className = "button button--primary";
    callButton.innerHTML = `<i class="fas fa-phone"></i><span class="text"> Anrufen </span>`;
    deleteButton.onclick = () => onDelete(data);
    searchButton.onclick = () => onSearch(data);
    callButton.onclick = () => onCall(data);

    /// append children
    itemFooter.append(deleteButton, searchButton, callButton);
    itemBody.append(itemBodyInfo, itemFooter);
    item.append(itemBody);

    this.generateRating(data.rating, itemBodyInfo.querySelector(".rating"));
    return item;
  };
  this.createListItems = (dataArr) => {
    wrapper.innerHTML = "";
    dataArr.forEach((data) => {
      wrapper.appendChild(this.createListItem(data));
    });
  };
  this.appendListItem = (data) => {
    let item = data;
    if (typeof data === "string") item = JSON.parse(data);
    wrapper.append(this.createListItem(data));
    console.log("appendListItem");
  };
  this.prependListItem = (data) => {
    let item = data;
    if (typeof data === "string") item = JSON.parse(data);
    wrapper.prepend(this.createListItem(item));
    console.log("prependListItem");
  };
  this.createListItems(this.list);
}
