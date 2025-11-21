// Simple JS for score slider + year
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("scoreSlider");
  const scoreRange = document.getElementById("scoreRange");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (!slider || !scoreRange) return;

  function updateScoreLabel(value) {
    let label = "";
    if (value < 580) {
      label = "Poor";
    } else if (value < 670) {
      label = "Fair";
    } else if (value < 740) {
      label = "Good";
    } else if (value < 800) {
      label = "Very Good";
    } else {
      label = "Exceptional";
    }
    scoreRange.textContent = label + " (" + value + ")";
  }

  updateScoreLabel(slider.value);

  slider.addEventListener("input", function (e) {
    updateScoreLabel(e.target.value);
  });
});
body {
  background: #0d1931;
  color: white;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.header {
  text-align: center;
  padding: 30px;
  background: #12203f;
}

.logo {
  width: 140px;
  margin-bottom: 15px;
}

.tagline {
  font-size: 18px;
  opacity: 0.9;
}

section {
  padding: 30px;
  max-width: 900px;
  margin: auto;
}

form input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 6px;
  border: none;
}

button {
  background: #ffcc00;
  color: #000;
  padding: 12px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}

