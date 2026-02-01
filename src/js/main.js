let titles = ['Chief Typo Officer', "Senior LLM Engineer", "What a weird title here", "Hello there", "Get me outta here", "Lead Bug Whisperer", "Principal Snack Strategist", "Global Chaos Coordinator", "Junior Vibe Architect", "Senior Coffee Overlord", "Chief Panic Officer", "Head of Accidental Innovation", "Director of Keyboard Catastrophes"]

// Title rotation functionality
let currentTitleIndex = 0;
let titleRotationInterval = null;
let promptSession = null;
let isLLMReady = false;

const prompt = `You are a marketing consultant for a senior developer.
                    Your job is to generate a short, funny, creative job title.
                    It should sound like a real corporate job title but with a humorous twist.
                    Keep it under 5 words. Do not include explanations—only output the title itself. Only include the title, no other text. Do not include punctuation.
                    Here are some examples: ${titles.join(', ')}`;


function fadeOutOriginalTitle() {
    const originalTitle = document.querySelector('.original-title');
    if (originalTitle) {
        originalTitle.classList.add('fade-out');
    }
}

async function initializeLLMSession() {
    try {
        
    
        promptSession = await LanguageModel.create({
            monitor(m) {
                m.addEventListener('downloadprogress', (e) => {
                    console.log(`Downloaded ${e.loaded * 100}%`);
                });
            },
            initialPrompt: [
                {
                    type: 'system',
                    content: prompt,
                },
            ],	
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
    const originalTitle = document.querySelector('.original-title');
    const aiIndicator = document.querySelector('.ai-indicator');
    if (!originalTitle) return;
    
    // Fade out current title and indicator
    originalTitle.classList.remove('fade-in');
    originalTitle.classList.add('fade-out');
    
    setTimeout(async () => {
        let titleText;
        let isAIGenerated = false;
        
        // Try to use generated title if requested and LLM is ready
        if (useGeneratedTitle && isLLMReady) {
            const generatedTitle = await generateNewTitle();
            if (generatedTitle) {
                titleText = generatedTitle.trim();
                isAIGenerated = true;
            } else {
                // Fallback to array titles if generation fails
                titleText = titles[currentTitleIndex];
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                isAIGenerated = false;
            }
        } else {
            // Use title from array
            titleText = titles[currentTitleIndex];
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            isAIGenerated = false;
        }
        
        originalTitle.innerHTML = `${titleText}`;
        console.log('showNextTitle', titleText);
        
        // Show or hide AI indicator
        if (aiIndicator) {
            if (isAIGenerated) {
                aiIndicator.style.visibility = 'visible';
                aiIndicator.classList.add('fade-in');
            } else {
                aiIndicator.style.visibility = 'hidden';
            }
        }
        
        // Fade in new title and indicator
        setTimeout(() => {
            originalTitle.classList.remove('fade-out');
            originalTitle.classList.add('fade-in');
            
        }, 50);
    }, 500); // Wait for fade out to complete
}

function startTitleRotation() {
    // Fade out original title first
    fadeOutOriginalTitle();
    
    // Wait for fade out, then show first fake title
    setTimeout(() => {
        // Show first title from array
        showNextTitle(false);
        
        // Then rotate every 8 seconds, using generated titles if LLM is ready
        titleRotationInterval = setInterval(() => {
            // Check dynamically if LLM is ready
            showNextTitle(isLLMReady);
        }, 5_000);
    }, 500);
}

// Confetti burst animation
const confettiCount = 100;

const confettiClassName = 'confetti';
const confettiText = ["🎉", "🥳", "🎉", "🎊", "🎉"]
const confettiFontSize = '2rem';

const searchParams = new URLSearchParams(window.location.search)
const currentDate = Date.now();
const confettiEndDate = new Date("2025-10-01").getTime()
const hasConfetti = searchParams.has('🎉') || currentDate < confettiEndDate


if (!hasConfetti) {
    const seniorText = document.querySelector('.senior-text');
    seniorText.classList.remove('senior-text');
}

function finalConfettiParticles(posY, posX) {
    // Wider spread and longer travel distance
    const centerAngle = Math.atan2(window.innerHeight / 2 - posY, window.innerWidth / 2 - posX);
    const spread = Math.PI / 2; // 90 degree spread for more coverage
    const angle = centerAngle + (Math.random() - 0.5) * spread;
    const distance = 400 + Math.random() * 500; // Much longer travel distance
    const randomX = Math.cos(angle) * distance;
    const randomY = Math.sin(angle) * distance;
    return { randomX, randomY };
}

function createConfettiParticles(posY, posX) {
    const idx = Math.round(0 + (Math.random() * confettiText.length))
    const confetti = document.createElement('div');
    confetti.className = confettiClassName;
    confetti.style.fontSize = `${1.5 + Math.random()}rem`
    confetti.textContent = confettiText[idx];
    confetti.style.animationDuration = (3 + Math.random() * 3) + 's';

    return confetti;
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];

    // Left bottom corner burst
    const leftX = -50;
    const leftY = -50;

    // Right bottom corner burst
    const rightX = window.innerWidth + 50;
    const rightY = -50;


    // Create confetti for left burst (shooting toward center)
    for (let i = 0; i < confettiCount; i++) {
        const confetti = createConfettiParticles(leftY, leftX);

        // Position at left corner
        confetti.style.left = leftX + 'px';
        confetti.style.top = leftY + 'px';

        const { randomX, randomY } = finalConfettiParticles(leftY, leftX);
        // Set CSS custom properties for animation

        confetti.style.setProperty('--random-x', randomX + 'px');
        confetti.style.setProperty('--random-y', randomY + 'px');

        // Random animation duration (1.5 to 3 seconds)

        container.appendChild(confetti);
    }

    // Create confetti for right burst (shooting toward center)
    for (let i = 0; i < confettiCount; i++) {
        const confetti = createConfettiParticles(rightY, rightX);
        // Position at right corner
        confetti.style.left = rightX + 'px';
        confetti.style.top = rightY + 'px';

        const { randomX, randomY } = finalConfettiParticles(rightY, rightX);

        // Set CSS custom properties for animation
        confetti.style.setProperty('--random-x', randomX + 'px');
        confetti.style.setProperty('--random-y', randomY + 'px');

        container.appendChild(confetti);
    }

    // Remove confetti after animation completes
    setTimeout(() => {
        container.innerHTML = '';
    }, 10_000);
}

// Trigger animations on page load
window.addEventListener('DOMContentLoaded', async () => {
    // Initialize LLM session first (this will download/setup the model)
    await initializeLLMSession();
    
    try {
    const availability = await LanguageModel.availability();
    } catch (error) {
        document.querySelector('.ai-indicator').remove();
    }
    // Start title rotation
    if(isLLMReady) {
        window.setTimeout(() => {
            startTitleRotation();
        }, 1000);
    }
    
    if (!hasConfetti) {
        return true
    }

    window.setTimeout(() => {
        const seniorText = document.querySelector('.senior-placeholder');
        seniorText.classList.add('animate-senior');
    }, 0)

    // Start confetti burst animation
    createConfetti();
});


const checkRybbit = () => {
  if (typeof window.rybbit?.pageview === 'function') {
    window.rybbit.pageview();
    console.log("Tracking page view");
    return;
  }
  setTimeout(checkRybbit, 100);
};

window.addEventListener("load", checkRybbit);
