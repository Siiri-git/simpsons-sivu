const singleImgs = document.querySelectorAll(".singleImg");
const singleImageView = document.getElementById("singleImageView");
const singleImage = document.getElementById("singleImage");
const galleryContainer = document.getElementById("gallery");
const backBtn = document.getElementById("backBtn");

// When clicking an image → switch to single-image mode
singleImgs.forEach(img => {
    img.addEventListener("click", () => {
        singleImage.src = img.src;

        // Hide grid + banner + nav
        galleryContainer.classList.add("hidden");

        // Show single image + back button
        singleImageView.classList.remove("hidden");
        backBtn.classList.remove("hidden");
    });
});

// Back button → restore original view
backBtn.addEventListener("click", () => {
    singleImageView.classList.add("hidden");
    backBtn.classList.add("hidden");

    galleryContainer.classList.remove("hidden");
});
