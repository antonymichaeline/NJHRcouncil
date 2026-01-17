// --- 1. THE DATA CENTER ---
// This acts as your database.
let siteData = {
    home: [
        {
            type: "hero-card",
            tag: "LATEST NEWS",
            title: "EOY Celebration Recap 📸",
            text: "A huge thank you to everyone who made our End of Year celebration at American Dream special. From our sponsors apree health & EHE Health to our amazing comedians Ashley Bendell & Peter Phelan.",
            span: 2
        },
        {
            type: "stat-card",
            tag: "MEMBERSHIP",
            title: "500+",
            text: "Active HR Leaders across New Jersey participating in our network.",
            span: 1
        }
    ],
    awards: [
        {
            category: "Speaker Award",
            winner: "Cecilia McKenney & Gillian Plummer",
            company: "Quest Diagnostics",
            icon: "🎙️"
        },
        {
            category: "Connector Award",
            winner: "Anna Compesi",
            company: "Quest Diagnostics",
            icon: "🤝"
        },
        {
            category: "Impact Award",
            winner: "Consuelo Boyles",
            company: "Schweiger Dermatology Group",
            icon: "⭐"
        },
        {
            category: "Member of the Year",
            winner: "Ankur Sharma",
            company: "Montefiore Health System",
            icon: "🏆"
        }
    ],
    members: [
        { name: "Ankur Sharma", role: "VP, Total Rewards", company: "Montefiore Health System" },
        { name: "Sarah Jenkins", role: "Head of People", company: "Stripe NJ" },
        { name: "David Ross", role: "Director of HR", company: "Prudential" }
    ]
};

// --- 2. RENDER FUNCTIONS ---
const container = document.getElementById('app-container');

function switchTab(tabName) {
    // 1. Update Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 2. Clear Content with Fade
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.innerHTML = '';
        
        if (tabName === 'home') renderHome();
        else if (tabName === 'updates') renderUpdates(); // Re-uses home data for now
        else if (tabName === 'awards') renderAwards();
        else if (tabName === 'members') renderMembers();
        
        // Fade In
        container.style.opacity = '1';
    }, 200);
}

function renderHome() {
    let html = '<div class="bento-grid">';
    siteData.home.forEach(item => {
        html += `
            <div class="card col-span-${item.span}">
                <span class="card-tag">${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
        `;
    });
    // Add a CTA card
    html += `
        <div class="card col-span-3" style="background: #0f172a; color: white;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="color:white;">Join the Council</h3>
                    <p style="color:#94a3b8;">Get access to exclusive events and networking.</p>
                </div>
                <a href="https://www.linkedin.com/company/new-jersey-hr-council/" target="_blank" class="btn-primary" style="background:white; color:#0f172a;">Join Now</a>
            </div>
        </div>
    `;
    html += '</div>';
    container.innerHTML = html;
}

function renderAwards() {
    let html = '<div class="bento-grid"><div class="card col-span-3"><h2>2025 Council Awards</h2><p style="margin-bottom:30px;">Voted by fellow Councilmembers.</p>';
    
    siteData.awards.forEach(award => {
        html += `
            <div class="award-item">
                <div class="award-icon">${award.icon}</div>
                <div class="award-details">
                    <div style="font-size: 0.75rem; color: #3b82f6; font-weight:700; text-transform:uppercase;">${award.category}</div>
                    <h4>${award.winner}</h4>
                    <span>${award.company}</span>
                </div>
            </div>
        `;
    });
    html += '</div></div>';
    container.innerHTML = html;
}

function renderMembers() {
    let html = '<div class="bento-grid">';
    siteData.members.forEach(member => {
        html += `
            <div class="card col-span-1" style="text-align:center;">
                <div style="width:60px; height:60px; background:#eff6ff; border-radius:50%; margin:0 auto 15px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-size:1.2rem;">
                    ${member.name.charAt(0)}
                </div>
                <h3>${member.name}</h3>
                <p style="font-size:0.85rem;">${member.role}</p>
                <p style="font-size:0.75rem; color:#94a3b8;">${member.company}</p>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// --- 3. ADMIN FUNCTIONS ---
function toggleAdmin() {
    const modal = document.getElementById('admin-modal');
    const editor = document.getElementById('json-editor');
    
    if (modal.classList.contains('hidden')) {
        const pass = prompt("Enter Admin Password:");
        if (pass === "admin") {
            modal.classList.remove('hidden');
            // Load current data into the text box
            editor.value = JSON.stringify(siteData, null, 4);
        } else {
            alert("Incorrect");
        }
    } else {
        modal.classList.add('hidden');
    }
}

function saveData() {
    const editor = document.getElementById('json-editor');
    try {
        const newData = editor.value;
        // Verify it is valid JSON
        JSON.parse(newData);
        
        // Create a downloadable file called 'data-update.json'
        // Ideally, in a real app, this would POST to a server. 
        // For GitHub Pages, we download the file to replace script.js content manually (or paste it).
        
        // For this demo, we will generate a NEW script.js file
        const newScript = `
// --- 1. THE DATA CENTER ---
let siteData = ${newData};

// --- 2. RENDER FUNCTIONS ---
${container.innerHTML = '' /* Just referencing to keep code valid */}
${switchTab.toString()}
${renderHome.toString()}
${renderAwards.toString()}
${renderMembers.toString()}
${toggleAdmin.toString()}
${saveData.toString()}

// Initialize
renderHome();
        `;
        
        const blob = new Blob([newScript], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "script.js";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        alert("Downloaded new script.js! Replace your old file with this one to update the site.");
        
    } catch (e) {
        alert("Invalid JSON format. Please check your syntax.");
    }
}

// Initialize
renderHome();