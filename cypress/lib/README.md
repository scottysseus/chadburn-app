# Cypress Lib

Our Cypress library contains helper functions for writing our Cypress tests:

1. Player-specific actions (like submitting a guess) are in `Player.js`
2. Psychic-specific actions (like submitting a hint) are in `Psychic.js`
3. General-purpose functions, typically for querying (e.g. getting the current score) are in `Game.js`

Actor action functions are meant to read like English sentences, e.g.

```javascript
Psychic.setsHint("a hint");
Player.setsGuessForPoints(2);
Player.choosesCorrectRebuttal();
```
