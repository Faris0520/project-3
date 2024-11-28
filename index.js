const imageElement = document.getElementById('image');
const descriptionElement = document.getElementById('description');
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const nextButton = document.getElementById('nextButton');
const accessKey = 'Qmb9rVSNnmGqM_9c8YkJM6mtLjs3AzBn0dotq7-H4RE'; // Ganti dengan kunci akses Anda

let currentTag = ''; // Inisialisasi currentTag sebagai string kosong

async function fetchRandomImage(tag) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${tag}&client_id=${accessKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }
    const data = await response.json();
    return {
        url: data.urls.regular,
        description: data.alt_description || 'No description available'
    };
}

async function displayImage(tag) {
    const { url, description } = await fetchRandomImage(tag);
    imageElement.src = url;
    descriptionElement.textContent = description;
    imageElement.style.display = 'block'; // Menampilkan gambar setelah berhasil dimuat
    nextButton.style.display = 'block'; // Menampilkan tombol Next setelah gambar telah muncul
}

searchButton.addEventListener('click', () => {
    currentTag = searchBox.value.trim();
    if (currentTag) {
        displayImage(currentTag); // Memanggil fungsi untuk mendapatkan gambar berdasarkan input
    }
});

nextButton.addEventListener('click', () => {
    if (currentTag) {
        displayImage(currentTag); // Memanggil fungsi untuk mendapatkan gambar berdasarkan tag yang sama
    }
});

// Gambar tidak akan ditampilkan saat halaman pertama kali dimuat