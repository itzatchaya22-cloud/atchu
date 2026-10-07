// ================= LOGIN =================

document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter Investigator ID and Password");
        return;
    }

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainApp").classList.remove("hidden");

    document.getElementById("investigatorName").innerText = username;

    showPage("dashboard");
});


// ================= PAGE NAVIGATION =================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }

    const titles = {
        dashboard: "Main Dashboard",
        analysis: "Social Media Analysis",
        detection: "AI Detection Result",
        evidence: "Evidence Management",
        cases: "Case Management",
        reports: "Report Generation",
        assistant: "AI Assistant"
    };

    document.getElementById("pageTitle").innerText =
        titles[pageId] || "DrugWatch AI";
}


// ================= LOGOUT =================

function logout() {

    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("loginForm").reset();

    alert("Logged out successfully!");
}


// ================= AI ANALYSIS =================

function analyzeData() {

    const platform = document.getElementById("platform").value;
    const account = document.getElementById("account").value;
    const content = document.getElementById("content").value.toLowerCase();

    if (account === "" || content === "") {
        alert("Please enter account/channel and public information.");
        return;
    }

    let indicators = [];

    const keywords = [
        "delivery",
        "powder",
        "pills",
        "price",
        "available",
        "contact",
        "dm",
        "white"
    ];

    keywords.forEach(function(keyword) {

        if (content.includes(keyword)) {
            indicators.push(keyword);
        }

    });

    let risk = "LOW";

    if (indicators.length >= 5) {
        risk = "HIGH";
    }
    else if (indicators.length >= 2) {
        risk = "MEDIUM";
    }

    const resultBox = document.getElementById("resultBox");

    resultBox.innerHTML = `
        <h3>🤖 AI Analysis Completed</h3>

        <p>
            <strong>Platform:</strong> ${platform}
        </p>

        <p>
            <strong>Account / Channel:</strong> ${account}
        </p>

        <p>
            <strong>Risk Level:</strong> ${risk}
        </p>

        <h4>Detected Indicators</h4>

        <ul>
            ${
                indicators.length > 0
                ? indicators.map(item => `<li>${item}</li>`).join("")
                : "<li>No significant indicators detected</li>"
            }
        </ul>

        <p>
            ⚠️ AI results are only investigative assistance.
            Human verification is required.
        </p>
    `;

    showPage("detection");
}


// ================= ADD EVIDENCE =================

function addEvidence() {

    const table = document.getElementById("evidenceTable");

    const evidenceId =
        "EV-" + Math.floor(1000 + Math.random() * 9000);

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${evidenceId}</td>
        <td>Social Media</td>
        <td>Public Information</td>
        <td>Under Review</td>
        <td>New</td>
    `;

    table.appendChild(newRow);

    alert("Evidence added successfully!");
}


// ================= REPORT GENERATION =================

function generateReport() {

    const caseId = document.getElementById("caseId").value;
    const notes = document.getElementById("notes").value;

    if (caseId === "") {
        alert("Please enter Case ID");
        return;
    }

    const reportResult =
        document.getElementById("reportResult");

    reportResult.innerHTML = `
        <div class="panel">

            <h3>📄 Investigation Report</h3>

            <p>
                <strong>Case ID:</strong> ${caseId}
            </p>

            <p>
                <strong>Date:</strong>
                ${new Date().toLocaleString()}
            </p>

            <h4>Investigator Notes</h4>

            <p>
                ${notes || "No notes provided."}
            </p>

            <hr>

            <p>
                AI-assisted analysis completed.
                Human investigator review is required.
            </p>

        </div>
    `;

    alert("Report generated successfully!");
}


// ================= AI ASSISTANT =================

function sendMessage() {

    const input = document.getElementById("chatInput");
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    const chatMessages =
        document.getElementById("chatMessages");

    chatMessages.innerHTML += `
        <div class="user-message">
            <strong>You:</strong> ${message}
        </div>
    `;

    let reply =
        "I can help with evidence organization, risk assessment and case summaries.";

    if (message.toLowerCase().includes("risk")) {

        reply =
            "The system uses Low, Medium and High risk levels based on detected indicators.";
    }

    else if (message.toLowerCase().includes("evidence")) {

        reply =
            "Evidence should contain an Evidence ID, source, type, timestamp and review status.";
    }

    else if (message.toLowerCase().includes("report")) {

        reply =
            "You can create an investigation report using the Report Generation section.";
    }

    chatMessages.innerHTML += `
        <div class="bot-message">
            <strong>AI Assistant:</strong> ${reply}
        </div>
    `;

    input.value = "";

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}