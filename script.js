// ---------------------------
// AI CREDIT ENGINE
// ---------------------------

const ai = {
    voice: new SpeechSynthesisUtterance(),

    texasLaws: [
        "Texas Finance Code §392 – Debt Collection Act",
        "Texas Business & Commerce Code §20 – Credit Reporting",
        "FCRA §602-623",
        "CROA (Credit Repair Organizations Act)"
    ],

    greeting() {
        return `Welcome to Elite Credit Repair. 
        I am your AI credit specialist. 
        I understand Texas credit laws, dispute strategies, 
        and exactly what steps will get you results the fastest.`;
    },

    speak(text) {
        this.voice.text = text;
        speechSynthesis.speak(this.voice);
    },

    analyzeForm(data) {
        let msg = `I’ve analyzed your information. Here's your personalized plan:\n\n`;

        if (data.score < 550) msg += `• Priority: Aggressive error targeting\n`;
        if (data.collections.length) msg += `• Collections to dispute: ${data.collections.length}\n`;
        if (data.lates > 0) msg += `• Late payments to challenge: ${data.lates}\n`;
        
        msg += `• All actions follow: ${this.texasLaws.join(", ")}\n`;
        msg += `• Estimated improvement window: 45–90 days\n`;

        return msg;
    },

    calculatePrice(data) {
        let base = 199;
        base += data.collections.length * 25;
        base += data.lates * 20;

        return `Your estimated service fee is $${base}.`;
    },

    disputePlan(data) {
        let plan = `Texas & Federal Compliant Dispute Strategy:\n\n`;

        if (data.collections.length) {
            plan += `• Collections challenged under FCRA §611 + TX Code §20.06\n`;
        }

        if (data.lates) {
            plan += `• Late payments challenged under FCRA §609 and §611\n`;
        }

        plan += `• Checking for re-aging violations under FCRA §623\n`;
        plan += `• Preparing bureau-specific dispute letters\n`;

        return plan;
    }
};

// ---------------------------
// INTAKE PROCESSING
// ---------------------------

document.getElementById("analyze").onclick = () => {
    const data = {
        score: Number(document.getElementById("score").value),
        collections: document.getElementById("collections").value.split(",").filter(x=>x.trim() !== ""),
        lates: Number(document.getElementById("lates").value),
        goal: document.getElementById("goal").value
    };

    let summary = ai.analyzeForm(data);
    let price = ai.calculatePrice(data);
    let disputes = ai.disputePlan(data);

    let full = summary + "\n" + price + "\n\n" + disputes;

    document.getElementById("ai-output").textContent = full;
    ai.speak(full);

    sendDailyReport(full);  // Auto send email
};

// ---------------------------
// EMAILJS DAILY REPORTS
// ---------------------------

function sendDailyReport(text) {
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "staytoncory6@gmail.com",
        report_message: text
    })
    .then(() => console.log("Daily report sent"));
}

// Auto-send every 24 hours
setInterval(() => {
    sendDailyReport("Daily AI System Check-in: All systems operational.");
}, 24 * 60 * 60 * 1000);

// Start with greeting
window.onload = () => ai.speak(ai.greeting());
