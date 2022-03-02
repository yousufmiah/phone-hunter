//found data result=========================
let dataCount = document.getElementById("found-data");
let dataCountR = document.getElementById("found-dataR");
let dataCountG = document.getElementById("found-dataG");

//Spinner =================================
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// Search Button ==========================
const searchBtn = () => {
  document.getElementById("image-mobile").innerHTML = "";
  document.getElementById("mobile-details").innerHTML = "";
  document.getElementById("found-dataR").innerHTML = "";
  document.getElementById("found-data").innerHTML = "";
  document.getElementById("found-dataG").innerHTML = "";
  const searchBox = document.getElementById("search-box");
  const searchValue = searchBox.value;

  // case to lower========================
  const searchText = searchValue.toLowerCase();
  // console.log(searchText);

  searchBox.value = "";

  if (searchText == "") {
    dataCountG.innerText = `Please write your Mobile name !`;
  } else {
    //spinner =============================
    toggleSpinner("block");

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMobiles(data.data));
  }

  //display Mobile image==========================
  const displayMobiles = (mobilePhone) => {
    // console.log(mobilePhone);

    //data count==================================
    if (mobilePhone == 0) {
      dataCountR.innerText = `Results not found !`;
    } else if (mobilePhone.length > 1) {
      dataCount.innerText = `${mobilePhone.length} results found for ${searchText} `;
    } else if (mobilePhone.length == 1) {
      dataCount.innerText = `${mobilePhone.length} results found for ${searchText} `;
    }

    const phone = mobilePhone.slice(0, 20);
    //   console.log(phone);

    phone.forEach((mobile) => {
      // console.log(phone);

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
          <button type="button" class="btn btn-primary px-5" data-bs-toggle="modal" 
           data-bs-target="#exampleModal" onclick="modalCardDetail('${mobile.slug}')">
           Details </button>
            </div>
          </div>
        </div>
    `;

      imageMobile.appendChild(div);
    });

    //spinner =======================================
    toggleSpinner("none");
  };
};

// Mobile details====================================
const modalCardDetail = (id) => {
  // console.log(id);

  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => modalBox(data));
};

const modalBox = (mdCard) => {
  // console.log(mCard);

  document.getElementById("modal-Box").innerHTML = "";
  const modalDeails = document.getElementById("modal-Box");
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.innerHTML = `

  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">${mdCard.data.brand}</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
  <div class="row g-0">
  <div class="col-md-4 text-center">
  <img src="${mdCard.data.image}" class="img-fluid rounded-start" alt="..." />
</div>

<div class="col-md-8">
  <div class="card-body">
    <h4 class="card-title"><strong>Name:</strong> ${mdCard.data.name}</h4>
    <h5 class="card-title"><strong>Brand:</strong> ${mdCard.data.brand}</h5>
    <h6><strong>Release Date:</strong> ${
      mdCard.data.releaseDate ? mdCard.data.releaseDate : "Not Available"
    }</h6>
    
  <small><strong>Main Features:</strong></small><br>
  <small><strong>ChipSet:</strong> ${mdCard.data.mainFeatures.chipSet}</small>
  <br>
  <small><strong>Display Size:</strong> ${
    mdCard.data.mainFeatures.displaySize
  }</small><br>
  <small><strong>Memory:</strong> ${
    mdCard.data.mainFeatures.memory
  }</small> <br>
  <small><strong>Storage:</strong> ${
    mdCard.data.mainFeatures.storage
  }</small> <br>
  <small><strong>Sensors:</strong> ${mdCard.data.mainFeatures.sensors.join(
    ", "
  )}</small> <br>
  <br>
  <small><strong>Others:</strong> <br> 
  <small><strong>Bluetooth:</strong> ${
    mdCard.data.others?.Bluetooth
      ? mdCard.data.others?.Bluetooth
      : "Not Available"
  }</small> <br>
  <small><strong>GPS:</strong> ${
    mdCard.data.others?.GPS ? mdCard.data.others?.GPS : "Not Available"
  }</small> <br>
  <small><strong>NFC:</strong> ${
    mdCard.data.others?.NFC ? mdCard.data.others?.NFC : "Not Available"
  }</small> <br>
  <small><strong>Radio:</strong> ${
    mdCard.data.others?.Radio ? mdCard.data.others?.Radio : "Not Available"
  }</small> <br>
  <small><strong>USB:</strong> ${
    mdCard.data.others?.USB ? mdCard.data.others?.USB : "Not Available"
  }</small> <br>
  <small><strong>WLAN:</strong> ${
    mdCard.data.others?.WLAN ? mdCard.data.others?.WLAN : "Not Available"
  }</small> <br>
   
  </div>
  </div>
</div>
</div>

`;
  modalDeails.appendChild(div);
};
