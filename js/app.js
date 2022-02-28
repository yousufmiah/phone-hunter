const getMobile = () => {
  const searchBtn = document.getElementById("search-box");
  const searchText = searchBtn.value;
  //   console.log(searchText);
  searchBtn.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMobiles(data.data));
};

const displayMobiles = (mobiles) => {
  //   console.log(mobiles);
  const mob = mobiles.slice(0, 20);
  //   console.log(mob);

  mob.forEach((mobile) => {
    // console.log(mobile);
    const imageMobile = document.getElementById("image-mobile");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
          <img src="${mobile.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Name: ${mobile.phone_name}</h5>
            <h6>Brand: ${mobile.brand}</h6>
            <button onclick="" >Details</button>
          </div>
        </div>
    `;
    // imageMobile.textContent = "";
    imageMobile.appendChild(div);
  });
};
