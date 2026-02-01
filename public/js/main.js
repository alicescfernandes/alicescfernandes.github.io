(() => {
  // src/js/main.js
  var titles = ["Chief Typo Officer", "Senior LLM Engineer", "What a weird title here", "Hello there", "Get me outta here", "Lead Bug Whisperer", "Principal Snack Strategist", "Global Chaos Coordinator", "Junior Vibe Architect", "Senior Coffee Overlord", "Chief Panic Officer", "Head of Accidental Innovation", "Director of Keyboard Catastrophes"];
  var currentTitleIndex = 0;
  var titleRotationInterval = null;
  var promptSession = null;
  var isLLMReady = false;
  var prompt = `You are a marketing consultant for a senior developer.
                    Your job is to generate a short, funny, creative job title.
                    It should sound like a real corporate job title but with a humorous twist.
                    Keep it under 5 words. Do not include explanations\u2014only output the title itself. Only include the title, no other text. Do not include punctuation.
                    Here are some examples: ${titles.join(", ")}`;
  function fadeOutOriginalTitle() {
    const originalTitle = document.querySelector(".original-title");
    if (originalTitle) {
      originalTitle.classList.add("fade-out");
    }
  }
  async function initializeLLMSession() {
    try {
      promptSession = await LanguageModel.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded * 100}%`);
          });
        },
        initialPrompt: [
          {
            type: "system",
            content: prompt
          }
        ]
      });
      isLLMReady = true;
      console.log("LLM session initialized and ready");
    } catch (error) {
      isLLMReady = false;
    }
  }
  async function generateNewTitle() {
    if (!isLLMReady || !promptSession) {
      console.warn("LLM session not ready yet");
      return null;
    }
    try {
      const newTitle = await promptSession.prompt(`${prompt}. Generate a new title!`);
      console.log("Generated new title:", newTitle);
      return newTitle;
    } catch (error) {
      console.error("Error generating new title:", error);
      return null;
    }
  }
  async function showNextTitle(useGeneratedTitle = false) {
    const originalTitle = document.querySelector(".original-title");
    const aiIndicator = document.querySelector(".ai-indicator");
    if (!originalTitle) return;
    originalTitle.classList.remove("fade-in");
    originalTitle.classList.add("fade-out");
    setTimeout(async () => {
      let titleText;
      let isAIGenerated = false;
      if (useGeneratedTitle && isLLMReady) {
        const generatedTitle = await generateNewTitle();
        if (generatedTitle) {
          titleText = generatedTitle.trim();
          isAIGenerated = true;
        } else {
          titleText = titles[currentTitleIndex];
          currentTitleIndex = (currentTitleIndex + 1) % titles.length;
          isAIGenerated = false;
        }
      } else {
        titleText = titles[currentTitleIndex];
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        isAIGenerated = false;
      }
      originalTitle.innerHTML = `${titleText}`;
      console.log("showNextTitle", titleText);
      if (aiIndicator) {
        if (isAIGenerated) {
          aiIndicator.style.visibility = "visible";
          aiIndicator.classList.add("fade-in");
        } else {
          aiIndicator.style.visibility = "hidden";
        }
      }
      setTimeout(() => {
        originalTitle.classList.remove("fade-out");
        originalTitle.classList.add("fade-in");
      }, 50);
    }, 500);
  }
  function startTitleRotation() {
    fadeOutOriginalTitle();
    setTimeout(() => {
      showNextTitle(false);
      titleRotationInterval = setInterval(() => {
        showNextTitle(isLLMReady);
      }, 5e3);
    }, 500);
  }
  var confettiCount = 100;
  var confettiClassName = "confetti";
  var confettiText = ["\u{1F389}", "\u{1F973}", "\u{1F389}", "\u{1F38A}", "\u{1F389}"];
  var searchParams = new URLSearchParams(window.location.search);
  var currentDate = Date.now();
  var confettiEndDate = (/* @__PURE__ */ new Date("2025-10-01")).getTime();
  var hasConfetti = searchParams.has("\u{1F389}") || currentDate < confettiEndDate;
  if (!hasConfetti) {
    const seniorText = document.querySelector(".senior-text");
    seniorText.classList.remove("senior-text");
  }
  function finalConfettiParticles(posY, posX) {
    const centerAngle = Math.atan2(window.innerHeight / 2 - posY, window.innerWidth / 2 - posX);
    const spread = Math.PI / 2;
    const angle = centerAngle + (Math.random() - 0.5) * spread;
    const distance = 400 + Math.random() * 500;
    const randomX = Math.cos(angle) * distance;
    const randomY = Math.sin(angle) * distance;
    return { randomX, randomY };
  }
  function createConfettiParticles(posY, posX) {
    const idx = Math.round(0 + Math.random() * confettiText.length);
    const confetti = document.createElement("div");
    confetti.className = confettiClassName;
    confetti.style.fontSize = `${1.5 + Math.random()}rem`;
    confetti.textContent = confettiText[idx];
    confetti.style.animationDuration = 3 + Math.random() * 3 + "s";
    return confetti;
  }
  function createConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"];
    const leftX = -50;
    const leftY = -50;
    const rightX = window.innerWidth + 50;
    const rightY = -50;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = createConfettiParticles(leftY, leftX);
      confetti.style.left = leftX + "px";
      confetti.style.top = leftY + "px";
      const { randomX, randomY } = finalConfettiParticles(leftY, leftX);
      confetti.style.setProperty("--random-x", randomX + "px");
      confetti.style.setProperty("--random-y", randomY + "px");
      container.appendChild(confetti);
    }
    for (let i = 0; i < confettiCount; i++) {
      const confetti = createConfettiParticles(rightY, rightX);
      confetti.style.left = rightX + "px";
      confetti.style.top = rightY + "px";
      const { randomX, randomY } = finalConfettiParticles(rightY, rightX);
      confetti.style.setProperty("--random-x", randomX + "px");
      confetti.style.setProperty("--random-y", randomY + "px");
      container.appendChild(confetti);
    }
    setTimeout(() => {
      container.innerHTML = "";
    }, 1e4);
  }
  window.addEventListener("DOMContentLoaded", async () => {
    await initializeLLMSession();
    try {
      const availability = await LanguageModel.availability();
    } catch (error) {
      document.querySelector(".ai-indicator").remove();
    }
    if (isLLMReady) {
      window.setTimeout(() => {
        startTitleRotation();
      }, 1e3);
    }
    if (!hasConfetti) {
      return true;
    }
    window.setTimeout(() => {
      const seniorText = document.querySelector(".senior-placeholder");
      seniorText.classList.add("animate-senior");
    }, 0);
    createConfetti();
  });
  var checkRybbit = () => {
    if (typeof window.rybbit?.pageview === "function") {
      window.rybbit.pageview();
      console.log("Tracking page view");
      return;
    }
    setTimeout(checkRybbit, 100);
  };
  window.addEventListener("load", checkRybbit);
})();
