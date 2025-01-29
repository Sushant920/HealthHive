let visitCount = 0;

function openForm() {
    document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}

function addVisit() {
    let hospital = document.getElementById("hospital").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;

    if (hospital === "" || date === "" || description === "") {
        alert("Please fill in all details.");
        return;
    }

    let timelineContent = document.getElementById("timeline-content");

    let visitDiv = document.createElement("div");
    visitDiv.classList.add("visit");

    visitDiv.classList.add(visitCount % 2 === 0 ? "left" : "right");

    visitDiv.innerHTML = `
        <h3>${hospital}</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p>${description}</p>
    `;

    timelineContent.appendChild(visitDiv); // Adds visit at the bottom

    visitCount++;

    closeForm();
    document.getElementById("hospital").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}
