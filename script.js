const catContainer = document.getElementById('cat-container');

// Function to fetch cat images from an API
async function fetchCatImages() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=20');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cat images:', error);
    return [];
  }
}

// Function to create cat cards and append to the container
function createCatCards(catImages) {
  catImages.forEach(catImage => {
    const catCard = document.createElement('div');
    catCard.className = 'cat-card';

    const catImageElement = document.createElement('img');
    catImageElement.className = 'cat-image';
    catImageElement.src = catImage.url;
    catImageElement.alt = 'Cat';

    catCard.appendChild(catImageElement);
    catContainer.appendChild(catCard);
  });
}

// Function to handle scroll event and fetch more cat images
async function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const catImages = await fetchCatImages();
    createCatCards(catImages);
  }
}

// Event listener for scroll event
window.addEventListener('scroll', handleScroll);

// Initial fetch and rendering of cat images
fetchCatImages().then(createCatCards);
