# 🎩 Hangman Game - A Twist on the Classic!

An interactive web-based Hangman game with animations, sound effects, and a unique gameplay twist!

---

## 📜 Description

This Hangman game flips the traditional rules—literally! Instead of building the hangman, you start with a fully assembled figure, and with each incorrect guess, one limb falls off. Your goal? Guess the word before your poor hangman loses all its limbs! ⚰️

---

## ✨ Features

- 🔠 **Random Word Selection** – Words are chosen randomly from a predefined list.
- 🎹 **Interactive Keyboard Input** – Type letters to guess the word.
- 🎬 **Animated Limb Removal** – Each wrong guess removes a limb.
- 🔊 **Immersive Sound Effects** – Get audio feedback for correct/incorrect guesses and game outcomes.
- 🏆 **Win/Lose Animations** – See a fun animation when the game ends.
- 📱 **Responsive Design** – Play on any screen size, from desktop to mobile.

---

## 🎮 How to Play

1. Open `index.html` in your web browser.
2. A random word will be selected and displayed as underscores (_ _ _ _ _).
3. Type letters on your keyboard to guess the word.
4. ✅ **Correct Guess** – The letter will appear in the word.
5. ❌ **Incorrect Guess** – A limb will fall off the hangman.
6. 🏅 **Win** – Guess the entire word before all limbs fall off.
7. ☠️ **Lose** – If all limbs fall off before you complete the word, it's game over.
8. 🔄 Click **"Play Again"** to start a new round!

---

## 📂 Project Structure

```
📦 Hangman Game
├── 📄 index.html   # Main game layout
├── 🎨 style.css    # Styling and animations
├── 🎮 script.js    # Game logic and event handling
├── 📜 words.js     # List of words for random selection
├── 📖 README.md    # Project documentation
└── 🔊 assets/      # Sound files
    ├── ✅ correct.mp3   # Correct guess sound
    ├── ❌ incorrect.mp3 # Incorrect guess sound
    ├── 🏆 win.mp3       # Winning sound
    └── ☠️ lose.mp3      # Losing sound
```

---

## 🛠️ Technical Implementation

- 🎨 **SVG Hangman Figure** – Each limb is a separate SVG element.
- 🎭 **CSS Animations** – Smooth transitions for limb removal and game outcomes.
- 🖥️ **JavaScript Logic** – Handles game mechanics, input validation, and UI updates.
- 🔉 **HTML5 Audio API** – Provides sound effects for an engaging experience.

---

## 🌐 Browser Compatibility

This game is designed to be fully responsive across different browsers, devices, and screen sizes.
---

## 🚀 Future Enhancements

- 🎚️ **Difficulty Levels** – Choose easy, medium, or hard word categories.
- 💡 **Hint System** – Get a clue when stuck.
- 🎹 **On-Screen Keyboard** – For mobile users.
- 📊 **Scoring System** – Track your wins and best streaks.
- 🎆 **More Visual Effects** – Enhanced animations and themes!

---

## 🎯 Ready to Play?

Clone the repo, open `index.html`, and start guessing! Can you save the hangman? 🤔💀