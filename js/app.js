const getMobile = () => {
  const searchBtn = document.getElementById("search-box");
  const searchText = searchBtn.value;
  console.log(searchText);
  searchBtn.value = "";
};
