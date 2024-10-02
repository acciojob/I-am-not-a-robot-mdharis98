//your code here
const imageContainer = document.getElementById("imageContainer");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const messageParagraph = document.getElementById("para");

const images = [
    'img1',
    'img2',
    'img3',
    'img4',
    'img5'
];

// Function to create a random image selection
function generateImages() {
    // Randomly select one image to duplicate
    const randomIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[randomIndex];

    // Shuffle and create the image elements
    const shuffledImages = [...images];
    shuffledImages.splice(randomIndex, 1); // Remove the duplicate index
    shuffledImages.splice(Math.floor(Math.random() * 6), 0, duplicateImage); // Add duplicate back randomly

    // Clear previous images
    imageContainer.innerHTML = '';

    // Create and append image elements to the container
    shuffledImages.forEach(imageClass => {
        const imgElement = document.createElement("img");
        imgElement.className = imageClass;
        imgElement.addEventListener("click", handleImageClick);
        imageContainer.appendChild(imgElement);
    });
}

let selectedImages = [];

// Handle image click event
function handleImageClick(event) {
    const img = event.target;

    // Prevent selecting the same image
    if (selectedImages.includes(img)) return;

    // Highlight selected image
    img.classList.toggle("selected");

    // Add or remove image from selected images
    if (img.classList.contains("selected")) {
        selectedImages.push(img);
    } else {
        selectedImages = selectedImages.filter(selected => selected !== img);
    }

    // Show or hide reset button based on selection
    resetButton.style.display = selectedImages.length > 0 ? 'block' : 'none';

    // Show verify button if two images are selected
    verifyButton.style.display = selectedImages.length === 2 ? 'block' : 'none';
}

// Reset state
resetButton.addEventListener("click", () => {
    selectedImages = [];
    document.querySelectorAll('.selected').forEach(img => img.classList.remove('selected'));
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    messageParagraph.textContent = '';
});

// Verify selected images
verifyButton.addEventListener("click", () => {
    const [firstImg, secondImg] = selectedImages;

    if (firstImg.className === secondImg.className) {
        messageParagraph.textContent = "You are a human. Congratulations!";
    } else {
        messageParagraph.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = 'none'; // Hide verify button after verification
});

// Initialize the images on page load
generateImages();
