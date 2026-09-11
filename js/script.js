/**
 * Kaushal Karn Portfolio - Cybernetic Glass Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mouse Spotlight Tracking on Glass Cards
  const cards = document.querySelectorAll(".glass-card");
  
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 2. Futuristic Smooth Scroll-In Reveal
  const observerOptions = { threshold: 0.12 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(22px)";
    card.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(card);
  });
});

/**
 * Auto-Failover to prevent broken activity charts during Vercel rate limits
 */
function handleGraphError(imgElement) {
  const currentSrc = imgElement.src;
  
  if (currentSrc.includes("github-readme-activity-graph.vercel.app")) {
    // Switch to fallback lightweight mirror
    imgElement.src = "https://ghchart.rshah.org/00f5ff/kaushal-karna";
    imgElement.alt = "GitHub Contribution Heatmap";
  } else {
    // If mirror also experiences delay, gracefully display action fallback
    imgElement.style.display = "none";
    const fallback = document.getElementById("activity-fallback");
    if (fallback) fallback.style.display = "block";
  }
}