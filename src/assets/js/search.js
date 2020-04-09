const searchBtn = document.getElementById("jsSearch");
const searchForm = document.getElementById("jsSearchForm");

function blindSearchBlock() {
  searchForm.setAttribute("class", "blind");
}
function showSearchBlock() {
  // searchBtn.setAttribute("class", "blind");
  if (searchForm.getAttribute("class") === "blind") {
    searchForm.setAttribute("class", "ani");
    searchBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  } else {
    setTimeout(blindSearchBlock, 1300);
    searchForm.setAttribute("class", "");

    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
  }
}

searchBtn.addEventListener("click", showSearchBlock);
