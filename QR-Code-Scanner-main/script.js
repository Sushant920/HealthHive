const videoElement = document.getElementById('video');
const messageElement = document.getElementById('message');

// Start video stream
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        videoElement.srcObject = stream;
        scanQRCode();
    } catch (err) {
        alert("Error accessing camera: " + err);
    }
}

// Scan QR Code from video feed
function scanQRCode() {
    const canvasElement = document.createElement("canvas");
    const canvasContext = canvasElement.getContext("2d");

    function scan() {
        if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            canvasElement.height = videoElement.videoHeight;
            canvasElement.width = videoElement.videoWidth;
            canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
            const code = jsQR(imageData.data, canvasElement.width, canvasElement.height);

            if (code) {
                // If QR Code is detected, handle the URL redirection
                const url = code.data;
                if (url) {
                    showRedirectMessage();
                    setTimeout(() => {
                        window.location.href = url;
                    }, 1000); // Redirect after 1 second
                }
            }
        }
        requestAnimationFrame(scan); // Keep scanning
    }

    scan();
}

// Show redirect message
function showRedirectMessage() {
    messageElement.style.display = "block";
}

// Start the camera when the page is loaded
startCamera();
