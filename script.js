let currentUser = "";

function login() {
    const username = document.getElementById("username").value;
    if (username === "") {
        alert("Please enter your name");
        return;
    }
    currentUser = username;
    localStorage.setItem("spiritualUser", username);
    document.getElementById("loginStatus").innerText =
        "Welcome, " + username + " 🙏";
    loadRecords();
}

function saveRecord() {
    if (currentUser === "") {
        alert("Please login first");
        return;
    }

    const japa = document.getElementById("japaCount").value;
    const meditation = document.getElementById("meditationTime").value;

    if (japa === "" || meditation === "") {
        alert("Please fill all fields");
        return;
    }

    const today = new Date().toLocaleDateString();

    const record = {
        date: today,
        japa: japa,
        meditation: meditation
    };

    let records = JSON.parse(localStorage.getItem(currentUser)) || [];
    records.push(record);
    localStorage.setItem(currentUser, JSON.stringify(records));

    loadRecords();
}

function loadRecords() {
    const recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = "";

    let records = JSON.parse(localStorage.getItem(currentUser)) || [];

    records.forEach(r => {
        recordsDiv.innerHTML += `
            <p>
                📅 ${r.date} |
                🕉️ Japa: ${r.japa} |
                🧘 Meditation: ${r.meditation} min
            </p>
        `;
    });
}

window.onload = () => {
    const savedUser = localStorage.getItem("spiritualUser");
    if (savedUser) {
        currentUser = savedUser;
        document.getElementById("loginStatus").innerText =
            "Welcome back, " + savedUser + " 🙏";
        loadRecords();
    }
};
