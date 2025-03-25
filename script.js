// Import the word list from words.js
import wordList from './words.js';

// Game variables
let selectedWord = "";
let guessedLetters = [];
let correctGuesses = [];
let incorrectGuesses = 0;
let gameOver = false;

// Limbs in order of removal (from first to last)
const limbs = ['left-arm', 'right-arm', 'left-leg', 'right-leg', 'body', 'head'];

// DOM elements
const wordDisplay = document.getElementById('wordDisplay');
const guessedLettersElement = document.getElementById('guessedLetters');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

// Audio elements
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

// Initialize the game
function initGame() {
    // Reset game variables
    selectedWord = selectRandomWord();
    guessedLetters = [];
    correctGuesses = [];
    incorrectGuesses = 0;
    gameOver = false;
    
    // Reset UI
    updateWordDisplay();
    guessedLettersElement.innerHTML = '';
    messageElement.textContent = '';
    messageElement.className = 'message';
    restartButton.style.display = 'none';
    
    // Reset hangman figure
    resetHangman();
}

// Select a random word from the list
function selectRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// Update the word display with underscores and guessed letters
function updateWordDisplay() {
    wordDisplay.innerHTML = '';
    
    for (let letter of selectedWord) {
        if (correctGuesses.includes(letter)) {
            wordDisplay.innerHTML += `<span>${letter}</span>`;
        } else {
            wordDisplay.innerHTML += `<span>_</span>`;
        }
    }
}

// Update the guessed letters display with color coding
function updateGuessedLettersDisplay() {
    guessedLettersElement.innerHTML = '';
    
    for (let letter of guessedLetters) {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        letterElement.className = 'guessed-letter';
        
        // Add appropriate class based on whether the letter is in the word
        if (selectedWord.includes(letter)) {
            letterElement.classList.add('correct-letter');
        } else {
            letterElement.classList.add('incorrect-letter');
        }
        
        guessedLettersElement.appendChild(letterElement);
    }
}

// Handle a letter guess
function handleGuess(letter) {
    if (gameOver || guessedLetters.includes(letter)) {
        return;
    }
    
    // Add to guessed letters
    guessedLetters.push(letter);
    updateGuessedLettersDisplay();
    
    if (selectedWord.includes(letter)) {
        // Correct guess
        correctSound.currentTime = 0;
        correctSound.play();
        
        correctGuesses.push(letter);
        updateWordDisplay();
        
        // Check for win
        if (checkWin()) {
            endGame(true);
        }
    } else {
        // Incorrect guess
        incorrectSound.currentTime = 0;
        incorrectSound.play();
        
        removeLimb();
        
        // Check for loss
        if (incorrectGuesses >= limbs.length) {
            endGame(false);
        }
    }
}

// Remove a limb with animation
function removeLimb() {
    const limbId = limbs[incorrectGuesses];
    const limbElement = document.getElementById(limbId);
    
    // Add appropriate animation class based on limb type
    if (limbId === 'head') {
        limbElement.classList.add('head-fall-animation');
    } else if (limbId === 'body') {
        limbElement.classList.add('body-fall-animation');
    } else {
        limbElement.classList.add('fall-animation');
    }
    
    // Listen for animation end to hide the limb
    limbElement.addEventListener('animationend', function() {
        limbElement.style.opacity = 0;
    }, { once: true });
    
    incorrectGuesses++;
}

// Reset the hangman figure
function resetHangman() {
    // Define all parts of the hangman that need to be reset
    const allHangmanParts = [
        // Limbs
        'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg',
        // Face elements
        'left-eye', 'right-eye', 'smile',
        // Gallows
        'gallows-base', 'gallows-post', 'gallows-beam', 'gallows-rope'
    ];
    
    // Reset all parts
    allHangmanParts.forEach(partId => {
        const element = document.getElementById(partId);
        if (element) {
            // Remove all animation classes
            element.classList.remove(
                'win-animation', 
                'fall-animation', 
                'head-fall-animation', 
                'body-fall-animation',
                'lose-animation'
            );
            
            // Reset all styles that might have been modified
            element.style.opacity = '1';
            element.style.display = '';
            element.style.transform = '';
            element.style.visibility = 'visible';
            
            // Reset any other properties that might affect visibility
            element.removeAttribute('hidden');
        }
    });
    
    // Reset gallows elements
    const gallowsParts = ['gallows-base', 'gallows-pole', 'gallows-top', 'gallows-rope'];
    gallowsParts.forEach(part => {
        const element = document.getElementById(part);
        if (element) {
            element.classList.remove('lose-animation');
        }
    });
    
    // Reset the entire hangman SVG (remove dramatic-fall class)
    const hangmanSvg = document.getElementById('hangman');
    if (hangmanSvg) {
        hangmanSvg.classList.remove('dramatic-fall');
    }
    
    // Remove any confetti elements
    const confettiElements = document.querySelectorAll('.confetti');
    confettiElements.forEach(element => element.remove());
}

// Check if the player has won
function checkWin() {
    return selectedWord.split('').every(letter => correctGuesses.includes(letter));
}

// End the game (win or lose)
function endGame(isWin) {
    gameOver = true;
    
    if (isWin) {
        // Win condition
        messageElement.textContent = 'Congratulations! You won!';
        messageElement.className = 'message win-message';
        winSound.play();
        
        // Create enhanced confetti effect
        createEnhancedConfetti();
        
        // Make hangman celebrate
        const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg', 'left-eye', 'right-eye', 'smile'];
        hangmanParts.forEach(part => {
            const element = document.getElementById(part);
            if (element && element.style.opacity !== '0') {
                element.classList.add('win-animation');
            }
        });
    } else {
        // Lose condition
        messageElement.textContent = `You lost! The word was: ${selectedWord}`;
        messageElement.className = 'message lose-message';
        loseSound.play();
        
        // Dramatic fall of the entire hangman
        const hangmanSvg = document.getElementById('hangman');
        hangmanSvg.classList.add('dramatic-fall');
    }
    
    restartButton.style.display = 'inline-block';
}

// Create enhanced confetti effect for win animation
function createEnhancedConfetti() {
    const body = document.body;
    const colors = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
        '#ff8000', '#8000ff', '#0080ff', '#ff0080', '#80ff00', '#00ff80'
    ];
    const shapes = ['', 'square', 'circle', 'triangle'];
    
    // Create many more confetti pieces
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        
        // Randomly select shape
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.className = `confetti ${shape}`;
        
        // Position across the entire screen width
        confetti.style.left = `${Math.random() * 100}vw`;
        
        // Random colors
        const color = colors[Math.floor(Math.random() * colors.length)];
        if (shape === 'triangle') {
            confetti.style.borderBottomColor = color;
        } else {
            confetti.style.backgroundColor = color;
        }
        
        // Random sizes
        const size = Math.random() * 0.5 + 0.7; // Scale between 0.7 and 1.2
        confetti.style.transform = `scale(${size})`;
        
        // Random animation delays and durations
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2-5 seconds
        
        // Add to body for fullscreen effect
        body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Info Modal functionality
const infoButton = document.getElementById('infoButton');
const infoModal = document.getElementById('infoModal');
const closeButton = document.querySelector('.close-button');

// Open modal when info button is clicked
infoButton.addEventListener('click', () => {
    infoModal.style.display = 'block';
});

// Close modal when close button is clicked
closeButton.addEventListener('click', () => {
    infoModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        infoModal.style.display = 'none';
    }
});

// Prevent keyboard input from triggering game when modal is open
document.addEventListener('keydown', (event) => {
    // If modal is open or game is over, don't process letter inputs
    if (infoModal.style.display === 'block' || gameOver) return;
    
    const key = event.key.toLowerCase();
    if (/^[a-z]$/.test(key)) {
        handleGuess(key);
    }
});

restartButton.addEventListener('click', initGame);

// Start the game when the page loads
window.addEventListener('load', initGame);
