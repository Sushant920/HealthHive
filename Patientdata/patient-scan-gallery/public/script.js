// Get DOM elements
const uploadButton = document.getElementById('uploadButton');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const submitScan = document.getElementById('submitScan');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

// Full-Screen Modal Elements
const fullScreenModal = document.getElementById('fullScreenModal');
const fullScreenImage = document.getElementById('fullScreenImage');

// Open the upload modal
uploadButton.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
});

// Close the upload modal
closeModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

// Submit scan details
submitScan.addEventListener('click', async () => {
    const date = dateInput.value;
    const description = descriptionInput.value;
    const file = fileInput.files[0];

    if (date && description && file) {
        const formData = new FormData();
        formData.append('date', date);
        formData.append('description', description);
        formData.append('scanImage', file);

        // Send the scan data to the backend
        try {
            const response = await fetch('/upload-scan', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Add the new scan to the gallery
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                // Image element
                const img = document.createElement('img');
                img.src = data.scan.filePath;
                galleryItem.appendChild(img);

                // Date element
                const dateElement = document.createElement('div');
                dateElement.classList.add('date');
                dateElement.textContent = date;
                galleryItem.appendChild(dateElement);

                // Description element
                const descriptionElement = document.createElement('div');
                descriptionElement.classList.add('description');
                descriptionElement.textContent = description;
                galleryItem.appendChild(descriptionElement);

                // Add the gallery item to the top of the gallery
                gallery.insertBefore(galleryItem, gallery.firstChild);

                // Click event to open image in full-screen modal
                img.addEventListener('click', () => {
                    fullScreenModal.style.display = 'flex';
                    fullScreenImage.src = img.src;
                });

                // Close full-screen modal when clicked
                fullScreenModal.addEventListener('click', () => {
                    fullScreenModal.style.display = 'none';
                });

                // Close the upload modal and reset fields
                uploadModal.style.display = 'none';
                dateInput.value = '';
                descriptionInput.value = '';
                fileInput.value = '';
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error uploading scan. Please try again later.');
        }
    } else {
        alert('Please fill in all the fields!');
    }
});

// Fetch and display all scans when the page loads
async function loadGallery() {
    try {
        const response = await fetch('/get-scans');
        const scans = await response.json();

        scans.forEach(scan => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = scan.filePath;
            galleryItem.appendChild(img);

            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = scan.date;
            galleryItem.appendChild(dateElement);

            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.textContent = scan.description;
            galleryItem.appendChild(descriptionElement);

            gallery.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

window.onload = loadGallery;
