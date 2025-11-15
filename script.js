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
