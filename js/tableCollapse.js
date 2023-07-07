const tableDevider = document.querySelectorAll(".devider");
tableDevider.forEach((table) => {
  const tableButton = table.querySelector(".more");
  tableButton.addEventListener("click", () => {
    const tabContent = table.querySelectorAll(".tabContent");
    tableButton.classList.toggle("active");
    tabContent.forEach((tab) => {
      tab.classList.toggle("active");
      console.log(tab);
    });
  });
});
const tableBox = document.querySelectorAll(".table__box");
tableBox.forEach((table) => {
  const tableDropdown = table.querySelector(".tableDropdown");
  const dropdownBtn = table.querySelector(".tableDropdown__button");
  const td = table.parentElement;
  dropdownBtn.addEventListener("click", () => {
    tableDropdown.classList.toggle("active");
    td.classList.toggle("active");
  });
});
