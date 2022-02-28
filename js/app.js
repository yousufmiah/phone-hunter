//found data result======================
const dataCount = document.getElementById("found-data");

//Spinner ================================
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// Search Button ===========================
const getMobile = () => {
  document.getElementById("image-mobile").innerHTML = "";
  document.getElementById("mobile-details").innerHTML = "";
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value;
  //   console.log(searchText);
  searchBox.value = "";

  if (searchText == "") {
    dataCount.innerText = `Please Write Mobile Name!`;
  } else {
    //spinner ======================
    toggleSpinner("block");

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMobiles(data.data));
  }

  //display Mobile image==========================
  const displayMobiles = (mobiles) => {
    // console.log(mobiles);
    const mob = mobiles.slice(0, 20);
    //   console.log(mob);

    //data count====================================
    if (mob == 0) {
      dataCount.innerText = `Results not found !`;
    } else if (mob.length > 1) {
      dataCount.innerText = `${mob.length} results found for ${searchText} `;
    } else if (mob.length == 1) {
      dataCount.innerText = `${mob.length} results found for ${searchText} `;
    }

    mob.forEach((mobile) => {
      // console.log(mobile);

      const imageMobile = document.getElementById("image-mobile");
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div class="card h-100">
          <img src="${mobile.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title"><strong>Name:</strong> ${mobile.phone_name}</h5>
            <h6><strong>Brand:</strong> ${mobile.brand}</h6>
            <button class="btn btn-primary" onclick="mobileDetail('${mobile.slug}')">Details</button>
          </div>
        </div>
    `;

      imageMobile.appendChild(div);
    });

    //spinner ======================
    toggleSpinner("none");
  };
};

// Mobile details====================================
const mobileDetail = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => mobilePhoto(data));
};

const mobilePhoto = (card) => {
  // console.log(card.data);
  document.getElementById("mobile-details").innerHTML = "";
  const mobileDetails = document.getElementById("mobile-details");
  const div = document.createElement("div");
  div.classList.add("card", "p-2");
  div.innerHTML = `
  <div class="row g-0">
  <div class="col-md-4 text-center">
  <img src="${card.data.image}" class="img-fluid rounded-start" alt="..." />
</div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title"><strong>Name:</strong> ${card.data.name}</h5>
    <h6><strong>Release Date:</strong> ${
      card.data.releaseDate ? card.data.releaseDate : "Not Available"
    }</h6>
<p><strong>ChipSet:</strong> ${card.data.mainFeatures.chipSet}</p>
<p><strong>Display Size:</strong> ${card.data.mainFeatures.displaySize}</p>
<p><strong>Memory:</strong> ${card.data.mainFeatures.memory}</p>
<p><strong>Storage:</strong> ${card.data.mainFeatures.storage}</p>
<p><strong>Sensors:</strong> ${card.data.mainFeatures.sensors}</p>
   
  </div>
  </div>
</div>
      `;

  mobileDetails.appendChild(div);
};
