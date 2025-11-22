let titles = ['Chief Typo Officer', "Senior LLM Engineer", "What a weird title here", "Hello there", "Get me outta here", "Lead Bug Whisperer", "Principal Snack Strategist", "Global Chaos Coordinator", "Junior Vibe Architect", "Senior Coffee Overlord", "Chief Panic Officer", "Head of Accidental Innovation", "Director of Keyboard Catastrophes"]

// Title rotation functionality
let currentTitleIndex = 0;
let titleRotationInterval = null;
let promptSession = null;
let webllmEngine = null;
let isLLMReady = false;
let llmProvider = null; // 'prompt-api' or 'webllm'

const systemPrompt = `You are a marketing consultant for a senior developer.
                    Generate ONLY a short, funny, creative job title.
                    Rules:
                    - Maximum 5 words
                    - NO explanations, NO descriptions, NO additional text
                    - NO punctuation marks (no periods, exclamation marks, quotes, etc.)
                    - NO introductory phrases like "Here's", "Introducing", "New title:", etc.
                    - Output ONLY the title itself, nothing else. no backround text, no explanation, no nothing.
                    - Sound like a real corporate job title but with a humorous twist, and related with the tech industry
                    Examples: ${titles.join(', ')}
                    Output format: Just the title, nothing else.`;


function fadeOutOriginalTitle() {
    const originalTitle = document.querySelector('.original-title');
    if (originalTitle) {
        originalTitle.classList.add('fade-out');
    }
}

async function checkPromptAPIAvailability() {
    try {
        if (typeof LanguageModel !== 'undefined' && LanguageModel.availability) {
            const availability = await LanguageModel.availability();
            return availability;
        }
        return false;
    } catch (error) {
        return false;
    }
}

async function initializePromptAPI() {
    try {
        promptSession = await LanguageModel.create({
            monitor(m) {
                m.addEventListener('downloadprogress', (e) => {
                    console.log(`Prompt API: Downloaded ${e.loaded * 100}%`);
                });
            },
            initialPrompt: [
                {
                    type: 'system',
                    content: systemPrompt,
                },
            ],	
        });
        
        llmProvider = 'prompt-api';
        isLLMReady = true;
        console.log("Prompt Session API initialized and ready");
        updateAIIndicator('prompt-api');
        return true;
    } catch (error) {
        console.error("Error initializing Prompt Session API:", error);
        return false;
    }
}

async function initializeWebLLM() {
    try {
        // Wait for webllm to be available
        if (!window.webllm) {
            await new Promise((resolve, reject) => {
                let attempts = 0;
                const maxAttempts = 50; // 5 seconds max wait
                const checkWebLLM = setInterval(() => {
                    if (window.webllm) {
                        clearInterval(checkWebLLM);
                        resolve();
                    } else if (++attempts >= maxAttempts) {
                        clearInterval(checkWebLLM);
                        reject(new Error('WebLLM failed to load'));
                    }
                }, 100);
            });
        }

        const initProgressCallback = (progress) => {
            /*
                {
                "progress": 0.25314193817380426,
                "timeElapsed": 24,
                "text": "Fetching param cache[5/24]: 150MB fetched. 25% completed, 24 secs elapsed. It can take a while when we first visit this page to populate the cache. Later refreshes will become faster."
                }
            */

            console.log("Model loading progress:", progress.progress, "timeElapsed:", progress.timeElapsed, "text:"     , progress.text   );
            document.querySelector('.original-title').innerHTML = `Hang-on! </br>Something incredible is coming.</br>${Math.round(progress.progress * 100)}%`;
        };

        const engine = new window.webllm.MLCEngine({ initProgressCallback });
        // Using a smaller model for faster loading
        // https://github.com/mlc-ai/web-llm/issues/683
        const modelId = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';
        
        console.log("Loading WebLLM model...");
        await engine.reload(modelId, {
            
            onProgress: (progress) => {
                console.log(`WebLLM: Model loading progress: ${progress}`);
            }
        });
        
        webllmEngine = engine;
        llmProvider = 'webllm';
        isLLMReady = true;
        console.log("WebLLM engine initialized and ready");
        updateAIIndicator('webllm');
        return true;
    } catch (error) {
        console.error("Error initializing WebLLM engine:", error);
        return false;
    }
}

async function initializeLLMSession() {
    // Try Prompt Session API first
    const promptAPIAvailable = await checkPromptAPIAvailability();
    
    if (promptAPIAvailable) {
        const success = await initializePromptAPI();
        if (success) {
            return;
        }
    }
    
    // Fallback to WebLLM
    console.log("Prompt Session API not available, falling back to WebLLM");
    await initializeWebLLM();
}

function updateAIIndicator(provider) {
    const aiIndicator = document.querySelector('.ai-indicator');
    const aiLink = document.querySelector('.ai-api-link');
    
    if (!aiIndicator || !aiLink) return;
    
    if (provider === 'prompt-api') {
        aiLink.textContent = 'Prompt Session API';
        aiLink.href = 'https://web.dev/articles/ai-chatbot-promptapi#demo';
    } else if (provider === 'webllm') {
        aiLink.textContent = 'WebLLM';
        aiLink.href = 'https://llm.mlc.ai/docs/deploy/webllm.html';
    }
}

function cleanAndValidateTitle(title) {
    if (!title) return null;
    
    // Remove common unwanted prefixes
    const unwantedPrefixes = [
        /^here'?s?\s+a?\s*/i,
        /^introducing\s+/i,
        /^new\s+title:?\s*/i,
        /^title:?\s*/i,
        /^here'?s?\s+the\s+/i,
        /^here'?s?\s+a\s+new\s+/i,
        /^the\s+title\s+is:?\s*/i,
        /^try:?\s*/i,
        /^suggested:?\s*/i,
    ];
    
    let cleaned = title.trim();
    
    // Remove unwanted prefixes
    for (const prefix of unwantedPrefixes) {
        cleaned = cleaned.replace(prefix, '');
    }
    
    // Remove quotes and punctuation at start/end
    cleaned = cleaned.replace(/^["'`«»„""]|["'`«»„""]$/g, '').trim();
    cleaned = cleaned.replace(/^[.,!?;:]+|[.,!?;:]+$/g, '').trim();
    
    // Extract first sentence or first line if there are multiple sentences
    // Stop at common sentence endings or newlines
    cleaned = cleaned.split(/[.!?]\s/)[0].trim();
    cleaned = cleaned.split('\n')[0].trim();
    
    // Remove any remaining explanations (look for patterns like "This is...", "The role...", etc.)
    const explanationPatterns = [
        /\s+this\s+is\s+/i,
        /\s+the\s+role\s+/i,
        /\s+this\s+new\s+title\s+/i,
        /\s+designed\s+to\s+/i,
        /\s+can\s+be\s+used\s+/i,
    ];
    
    for (const pattern of explanationPatterns) {
        const match = cleaned.search(pattern);
        if (match > 0) {
            cleaned = cleaned.substring(0, match).trim();
            break;
        }
    }
    
    // Count words
    const words = cleaned.split(/\s+/).filter(w => w.length > 0);
    
    // Validate: must be between 1 and 6 words (allowing a bit of flexibility)
    if (words.length === 0 || words.length > 6) {
        return null;
    }
    
    // Check if it's too long (more than 50 characters is probably too long)
    if (cleaned.length > 50) {
        return null;
    }
    
    // Final cleanup: remove any remaining trailing punctuation
    cleaned = cleaned.replace(/[.,!?;:]+$/, '').trim();
    
    return cleaned || null;
}

async function generateNewTitle() {
    if (!isLLMReady) {
        console.warn("LLM not ready yet");
        return null;
    }
    
    try {
        let rawTitle = null;
        
        if (llmProvider === 'prompt-api' && promptSession) {
            // Use Prompt Session API
            rawTitle = await promptSession.prompt(`${systemPrompt}. Generate a new title!`);
        } else if (llmProvider === 'webllm' && webllmEngine) {
            // Use WebLLM
            const messages = [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: 'Generate a new title. Output ONLY the title, nothing else.' }
            ];
            
            const response = await webllmEngine.chat.completions.create({
                messages: messages
            });
            rawTitle = response.choices[0].message.content;
        }
        
        if (rawTitle) {
            // Just basic trimming, no validation
            const title = rawTitle.trim();
            console.log(`Generated new title (${llmProvider}):`, title);
            return title;
        }
        
        return null;
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
    // Initialize LLM session first (tries Prompt API, falls back to WebLLM)
    await initializeLLMSession();
    
    // If neither LLM initialized, remove the AI indicator
    if (!isLLMReady) {
        const aiIndicator = document.querySelector('.ai-indicator');
        if (aiIndicator) {
            aiIndicator.remove();
        }
    }else{
        // Start title rotation
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