"use strict";

function toggleDisplay(element) {
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

const hideVideo = document.getElementById("hide-video");
hideVideo.addEventListener('click', async function handleClick() {
  toggleDisplay(document.getElementById("video-container"));
});

const hideImages = document.getElementById("hide-image");
hideImages.addEventListener('click', async function handleClick() {
  toggleDisplay(document.getElementById("image-container"));
});
