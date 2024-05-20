# Platformer Game

This is a simple platformer game built using JavaScript and HTML5 canvas. The player can move left, right, and jump across platforms. The game features gravity, platform collision detection, and background images.


## Game Mechanics
The game is a classic platformer where the player can:

Move left and right.
Jump onto and from platforms.
Fall due to gravity.
Restart the game upon falling off the screen.


# Classes and Objects

1. Player :  The Player class handles the player's character, including position, velocity, dimensions, and animations. Key methods include:
2. draw(): Renders the player on the canvas.
3.  update(): Updates the player's position and handles animations.
4. Platform: The Platform class represents platforms in the game that the player can stand on. Key methods include:
5. smallPlat: The smallPlat class is similar to the Platform class but for smaller platforms. Key methods include:
6.draw(): Renders the small platform on the canvas.
7.GenericObject: The GenericObject class is used for static images like the background and hills. Key methods include:


# Controls
The player can control the game character using the following keys:

W / Up Arrow: Jump
A / Left Arrow: Move left
D / Right Arrow: Move right


# Customization
You can customize the game by modifying various aspects of the code:

Sprites and Images: Replace the images in the sprites object and update their paths in the index.js file.
Gravity: Adjust the gravity constant to change how the player falls.
Platform Positions: Modify the platforms array to change where platforms are placed.
Player Speed: Adjust the speed variable to change how fast the player moves.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
