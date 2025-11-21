// ---------------------------
// ELITE CREDIT AI – SOFT TONE VERSION (NO ROBOT VOICE)
// ---------------------------

const ai = {
    texasLaws: [
        "Texas Finance Code §392 – Debt Collection Act",
        "Texas Business & Commerce Code §20 – Credit Reporting",
        "FCRA §602–623",
        "CROA – Credit Repair Organizations Act"
    ],

    greeting() {
        return [
            "Welcome to Elite Credit Repair.",
            "",
            "You’re not alone, and you’re not stuck.",
            "Together, we’ll look at where you are now,",
            "spot the biggest opportunities under Texas and federal law,",
            "and outline calm, realistic steps to move your credit forward.",
            "",
            "Start by filling out the short form above,",
            "and I’ll walk you through a customized plan in plain English."
        ].join("\n");
    },

    analyzeForm(data) {
        let lines = [];

        lines.push("🧠 Personal Credit Snapshot");
        lines.push("-------------------------------------");

        if (!data.score) {
            lines.push("• I don’t see a score listed yet, but that’s okay. We can still map out your options.");
        } else if (data.score < 550) {
            lines.push("• Your score suggests things may feel pretty heavy right now. That’s exactly when strategy matters most.");
        } else if (data.score < 650) {
            lines.push("• You’re closer than you think. With focused work, there may be real room for improvement.");
        } else {
            lines.push("• Your score isn’t in the worst range, but fine-tuning can still create better approvals and terms.");
        }

        if (data.collections.length) {
            lines.push(`• I see about ${data.collections.length} collection account(s) listed. We’ll review each one for accuracy and compliance.`);
        }

        if (data.lates > 0) {
            lines.push(`• You’ve reported ${data.lates} late payment(s). We’ll look at how they’re reporting and whether any can be challenged.`);
        }

        if (data.goal) {
            lines.push(`• Your main goal: "${data.goal}". We’ll keep every step focused on getting you closer to that outcome.`);
        }

        lines.push("");
        lines.push("Nothing here is automatic or guaranteed, but there are usually more options than people are told.");
        return lines.join("\n");
    },

    calculatePrice(data) {
        let base = 199;                   // base onboarding / audit
        base += data.collections.length * 25;
        base += data.lates * 20;

        let lines = [];
        lines.push("💰 Transparent Pricing Snapshot");
        lines.push("-------------------------------------");
        lines.push(`• Estimated setup + strategy: $199`);
        if (data.collections.length) {
            lines.push(`• Approx. collections work: $${data.collections.length * 25}`);
        }
        if (data.lates > 0) {
            lines.push(`• Late-payment work: $${data.lates * 20}`);
        }
        lines.push("");
        lines.push(`Estimated total based on what you entered: ~$${base}.`);
        lines.push("This is an estimate only. Final pricing is always reviewed with you before any work begins.");
        lines.push("No upfront guarantees. All work is designed to stay within CROA, FCRA, and Texas law.");
        return lines.join("\n");
    },

    disputePlan(data) {
        let lines = [];
        lines.push("📄 Strategy Outline (Educational Overview)");
        lines.push("-------------------------------------");
        lines.push("Here’s a general idea of what a compliant plan can look like based on what you entered:");

        if (data.collections.length) {
            lines.push("");
            lines.push("• Collections");
            lines.push("- Review each collection for accuracy, dates, balance, and ownership.");
            lines.push("- Where appropriate, use FCRA §611 and Texas Bus. & Comm. Code §20 to request verification and correction.");
        }

        if (data.lates > 0) {
            lines.push("");
            lines.push("• Late Payments");
            lines.push("- Compare the reported late dates against your records.");
            lines.push("- When something doesn’t line up, a targeted challenge under FCRA §609/§611 may be appropriate.");
        }

        lines.push("");
        lines.push("• Ongoing Monitoring & Education");
        lines.push("- Watch for re-aging issues, duplicate reporting, and balance errors (FCRA §623).");
        lines.push("- Build healthier usage patterns and mix over time, not just short-term quick fixes.");
        lines.push("");
        lines.push("This overview is educational and not legal advice, but it gives you a clear, calm starting point.");
        return lines.join("\n");
    }
};

// ---------------------------
// INTAKE PROCESSING & OUTPUT
// ---------------------------

const outputEl = document.getElementById("ai-output");

function showMessage(text) {
    outputEl.textContent = text;
}

document.getElementById("analyze").onclick = () => {
    const data = {
        score: Number(document.getElementById("score").value),
        collections: document.getElementById("collections").value
            .split(",")
            .map(x => x.trim())
            .filter(x => x !== ""),
        lates: Number(document.getElementById("lates").value) || 0,
        goal: document.getElementById("goal").value.trim()
    };

    const summary   = ai.analyzeForm(data);
    const pricing   = ai.calculatePrice(data);
    const strategy  = ai.disputePlan(data);

    const fullText = [
        summary,
        "",
        pricing,
        "",
        strategy
    ].join("\n\n");

    showMessage(fullText);

    // still send a report behind the scenes
    sendDailyReport(fullText);
};

// ---------------------------
// EMAILJS DAILY REPORTS
// ---------------------------
// Make sure you replace YOUR_SERVICE_ID / YOUR_TEMPLATE_ID / YOUR_PUBLIC_KEY in index.html

function sendDailyReport(text) {
    // This sends a report of the most recent analysis
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "staytoncory6@gmail.com",
        report_message: text || "Elite Credit AI Daily Check-in"
    }).then(
        () => console.log("Report sent to staytoncory6@gmail.com"),
        (err) => console.error("EmailJS error:", err)
    );
}

// Once every 24 hours, send a simple heartbeat report
setInterval(() => {
    sendDailyReport("Daily Elite Credit AI heartbeat: system online and ready.");
}, 24 * 60 * 60 * 1000);

// Show gentle greeting on load
window.onload = () => {
    showMessage(ai.greeting());
};
