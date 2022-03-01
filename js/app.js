//found data result======================
let dataCount = document.getElementById("found-data");
let dataCountR = document.getElementById("found-dataR");
let dataCountG = document.getElementById("found-dataG");

//Spinner ================================
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// Search Button ===========================
const searchBtn = () => {
  document.getElementById("image-mobile").innerHTML = "";
  document.getElementById("mobile-details").innerHTML = "";
  document.getElementById("found-dataR").innerHTML = "";
  document.getElementById("found-data").innerHTML = "";
  document.getElementById("found-dataG").innerHTML = "";
  const searchBox = document.getElementById("search-box");
  const searchValue = searchBox.value;

  // case to lower===============================
  const searchText = searchValue.toLowerCase();
  // console.log(searchText);

  searchBox.value = "";

  if (searchText == "") {
    dataCountG.innerText = `Please Write Mobile Name !`;
  } else {
    //spinner ======================
    toggleSpinner("block");

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMobiles(data.data));
  }

  //display Mobile image==========================
  const displayMobiles = (mobilePhone) => {
    // console.log(mobiles);

    const phone = mobilePhone.slice(0, 20);
    //   console.log(mob);

    //data count====================================
    if (phone == 0) {
      dataCountR.innerText = `Results not found !`;
    } else if (phone.length > 1) {
      dataCount.innerText = `${phone.length} results found for ${searchText} `;
    } else if (phone.length == 1) {
      dataCount.innerText = `${phone.length} results found for ${searchText} `;
    }
    phone.forEach((mobile) => {
      // mob.forEach((mobile) => {
      // console.log(mobile);

      const imageMobile = document.getElementById("image-mobile");
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div class="card h-100 shadow p-3 bg-body rounded">
          <img src="${mobile.image}" class="card-img-top" alt="..." />
          <div class="card-body col text-center">
            <h5 class="card-title"><strong>Name:</strong> ${mobile.phone_name}</h5>
            <h6><strong>Brand:</strong> ${mobile.brand}</h6>
            <div class="card-footer bg-gray ">
            <button class="btn btn-primary px-5 " onclick="mobileDetail('${mobile.slug}')">Details</button>
            </div>
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
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => mobilePhoto(data));
};

const mobilePhoto = (mCard) => {
  console.log(mCard.data);
  document.getElementById("mobile-details").innerHTML = "";
  const mobileDetails = document.getElementById("mobile-details");
  const div = document.createElement("div");
  div.classList.add("card", "p-2");
  div.innerHTML = `
  <div class="row g-0">
  <div class="col-md-4 text-center">
  <img src="${mCard.data.image}" class="img-fluid rounded-start" alt="..." />
</div>
<div class="col-md-8">
  <div class="card-body">
    <h4 class="card-title"><strong>Name:</strong> ${mCard.data.name}</h4>
    <h5 class="card-title"><strong>Brand:</strong> ${mCard.data.brand}</h5>
    <h6><strong>Release Date:</strong> ${
      mCard.data.releaseDate ? mCard.data.releaseDate : "Not Available"
    }</h6>
    
<small><strong>Main Features:</strong></small><br>
<small><strong>ChipSet:</strong> ${mCard.data.mainFeatures.chipSet}</small><br>
<small><strong>Display Size:</strong> ${
    mCard.data.mainFeatures.displaySize
  }</small><br>
<small><strong>Memory:</strong> ${mCard.data.mainFeatures.memory}</small> <br>
<small><strong>Storage:</strong> ${mCard.data.mainFeatures.storage}</small> <br>
<small><strong>Sensors:</strong> ${mCard.data.mainFeatures.sensors.join(
    ", "
  )}</small> <br>
<br>
<small><strong>Others:</strong> <br>
<small><strong>Bluetooth:</strong> ${mCard.data.others?.Bluetooth}</small> <br>
<small><strong>GPS:</strong> ${mCard.data.others?.GPS}</small> <br>
<small><strong>NFC:</strong> ${mCard.data.others?.NFC}</small> <br>
<small><strong>Radio:</strong> ${mCard.data.others?.Radio}</small> <br>
<small><strong>USB:</strong> ${mCard.data.others?.USB}</small> <br>
<small><strong>WLAN:</strong> ${mCard.data.others?.WLAN}</small> <br>
   
  </div>
  </div>
</div>
      `;

  mobileDetails.appendChild(div);
};
