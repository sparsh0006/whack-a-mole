# 🐹 Tung Tung Sahur 🏏 - Whack-a-Mole Game

## Description

"Tung Tung Sahur" is a fun, fast-paced Whack-a-Mole style game with a delightful cultural twist, themed around the pre-dawn meal tradition. Players must quickly "whack" the friendly characters that pop up from holes while avoiding the danger characters. Score points, level up for increasing speed, and try not to miss too many!

This game was conceptualized and brought to life with the spirit of creativity and game development fostered by platforms like **[CyberLife.gg](https://cyberlife.gg/)**. We aimed to build an engaging browser-based experience, drawing inspiration from the innovative possibilities showcased in the game creation sphere that CyberLife.gg represents.

## Features

*   Classic Whack-a-Mole gameplay.
*   **Score System:** Earn 1 point for each friendly character whacked.
*   **Miss Counter:** The game ends if you miss 5 friendly characters.
*   **Leveling System:** Score enough points to advance to the next level, increasing the character pop-up speed.
*   **Friendly & Danger Characters:** Differentiate between characters to hit and characters to avoid.
*   **Dynamic SVG Characters:** Characters are rendered using dynamically generated SVGs.
*   **Bat Animation:** Visual feedback when whacking.
*   **Sound Effects:** Basic audio cues for hits, misses, danger, and level-ups using the Web Audio API.
*   **Responsive Design:** Adapts to different screen sizes.
*   **Built with Modern Web Technologies:** HTML, CSS, and Vanilla JavaScript (ES Modules).

## How to Play

1.  **Start:** Click the "Click to Start!" message on the game overlay.
2.  **Objective:**
    *   Click or tap on the **friendly characters** (Mouse, Bunny, Tung) as they pop out of the holes to score points.
    *   **Avoid** clicking the **danger character**. Hitting a danger character results in an immediate Game Over.
3.  **Scoring:** You get +1 point for each friendly character successfully whacked.
4.  **Misses:** If a friendly character disappears before you whack it, it counts as a miss. The game ends if you accumulate 5 misses.
5.  **Levels:** Accumulate a target number of points (10 points per level, cumulative) to advance to the next level. Each new level increases the speed at which characters appear.
6.  **Game Over:** The game ends if you hit a danger character or miss 5 friendly characters. Click the overlay to restart.

## Tech Stack

*   **HTML5:** For the basic structure.
*   **CSS3:** For styling, layout (Grid), and animations (Keyframes).
*   **Vanilla JavaScript (ES Modules):** For all game logic, DOM manipulation, and event handling.
*   **SVG:** For rendering the characters dynamically.
*   **Web Audio API:** For simple, programmatically generated sound effects.

## Running the Game

1.  Clone or download this repository.
2.  Open the `index.html` file in your web browser.

Alternatively, you can serve the project directory using a simple HTTP server (e.g., using Python's `http.server` module or a VS Code extension like Live Server).

## Files

*   `index.html`: The main HTML file.
*   `style.css`: Contains all the CSS styles and animations.
*   `main.js`: Initializes the game board and handles UI updates for stats and overlays.
*   `game.js`: Contains the core game logic, state management, character pop-up mechanics, scoring, and sound effects.
*   `characters.js`: Responsible for creating and rendering the SVG for different game characters.

## Future Improvements (Potential)

*   More diverse character types and animations.
*   Special power-ups or bonus items.
*   More sophisticated sound design and background music.
*   A persistent high-score leaderboard.

---

Enjoy playing Tung Tung Sahur!
