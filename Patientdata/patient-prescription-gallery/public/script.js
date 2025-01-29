// Get DOM elements
const uploadButton = document.getElementById('uploadButton');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const submitPrescription = document.getElementById('submitPrescription');
const doctorInput = document.getElementById('doctor');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const fileInput = document.getElementById('fileInput');
const prescriptionGallery = document.getElementById('prescriptionGallery');

// Open the upload modal
uploadButton.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
});

// Close the upload modal
closeModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

// Submit prescription details
submitPrescription.addEventListener('click', async () => {
    const doctor = doctorInput.value.trim();
    const date = dateInput.value;
    const description = descriptionInput.value.trim();
    const file = fileInput.files[0];

    if (doctor && date && description && file) {
        const formData = new FormData();
        formData.append('doctor', doctor);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('prescriptionImage', file);

        // Send the prescription data to the backend
        try {
            const response = await fetch('/upload-prescription', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Add the new prescription to the gallery
                const prescriptionItem = document.createElement('div');
                prescriptionItem.classList.add('prescription-item');

                // Image element
                const img = document.createElement('img');
                img.src = data.prescription.filePath;
                prescriptionItem.appendChild(img);

                // Details
                const details = document.createElement('div');
                details.classList.add('prescription-details');
                details.innerHTML = 
                    `<strong>Doctor:</strong> ${doctor} <br>
                    <strong>Date:</strong> ${date} <br>
                    <strong>Notes:</strong> ${description}`;
                prescriptionItem.appendChild(details);

                // Add to gallery
                prescriptionGallery.insertBefore(prescriptionItem, prescriptionGallery.firstChild);

                // Reset and close modal
                doctorInput.value = '';
                dateInput.value = '';
                descriptionInput.value = '';
                fileInput.value = '';
                uploadModal.style.display = 'none';
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error uploading prescription. Please try again later.');
        }
    } else {
        alert('Please fill in all fields!');
    }
});

// Fetch and display all prescriptions when the page loads
async function loadGallery() {
    try {
        const response = await fetch('/get-prescriptions');
        const prescriptions = await response.json();

        prescriptions.forEach(prescription => {
            const prescriptionItem = document.createElement('div');
            prescriptionItem.classList.add('prescription-item');

            const img = document.createElement('img');
            img.src = prescription.filePath;
            prescriptionItem.appendChild(img);

            const details = document.createElement('div');
            details.classList.add('prescription-details');
            details.innerHTML = 
                `<strong>Doctor:</strong> ${prescription.doctor} <br>
                <strong>Date:</strong> ${prescription.date} <br>
                <strong>Notes:</strong> ${prescription.description}`;
            prescriptionItem.appendChild(details);

            prescriptionGallery.appendChild(prescriptionItem);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

window.onload = loadGallery;
