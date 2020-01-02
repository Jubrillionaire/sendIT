"use strict";

var token = localStorage.getItem("token");
var role = localStorage.getItem("role");

if (!token) {
  window.location.href = './login.html';
}

if (role !== "admin") {
  window.location = "./userProfile.html";
}

var editLocation = function editLocation(event) {
  event.preventDefault();
  fetch("http://localhost:3000/api/v1/parcels/location", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      parcelId: document.getElementById("parcelId").value,
      presentLocation: document.getElementById("presentLocation").value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    if (res.details) {
      window.location = "adminParcels.html";
      toastr.success("location changed successfully!");
    } else if (res.msg) {
      toastr.error("unable to change destination");
    }
  })["catch"](function (err) {
    return console.log("error occured", err);
  });
};

document.getElementById("edit-form").addEventListener("submit", editLocation);
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});