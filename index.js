// Select the canvas element and set its dimensions
var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

// Get the 2D drawing context for the canvas
var c = canvas.getContext("2d");

// Define the gravity constant
const gravity = 1;

// Define image objects with their URLs and alternative texts
var platformImg = {
    imageUrl: "./platform.png", // URL of the platform image
    altText: "Description of the image" // Alt text for accessibility
};

var bgImg = {
    imageUrl: "./background.png", // URL of the background image
    altText: "Description of the image" // Alt text for accessibility
};

var smallPlatImg = {
    imageUrl: "./platformSmallTall.png", // URL of the small platform image
    altText: "Description of the image" // Alt text for accessibility
};

var runRight = {
    imageUrl: "./spriteRunRight.png", // URL of the running right sprite
    altText: "Description of the image" // Alt text for accessibility
};

var runLeft = {
    imageUrl: "./spriteRunLeft.png", // URL of the running left sprite
    altText: "Description of the image" // Alt text for accessibility
};

var standRight = {
    imageUrl: "./spriteStandRight.png", // URL of the standing right sprite
    altText: "Description of the image" // Alt text for accessibility
};

var standLeft = {
    imageUrl: "./spriteStandleft.png", // URL of the standing left sprite
    altText: "Description of the image" // Alt text for accessibility
};

var hillImg = {
    imageUrl: "./hills.png", // URL of the hills image
    altText: "Description of the image" // Alt text for accessibility
};

// Get the start button and audio elements from the DOM
var start = document.getElementById("start");
var footAudio = document.getElementById("footAudio");
var jumpAudio = document.getElementById("jumpAudio");

// Player class definition
class Player {
    constructor() {
        // Initialize player position and velocity
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 40 };

        // Define player dimensions
        this.width = 65;
        this.height = 150;

        // Define player sprites for standing and running
        this.sprites = {
            stand: {
                right: createImage(standRight.imageUrl),
                left: createImage(standLeft.imageUrl),
                cropWidth: 177,
                width: 66
            },
            run: {
                right: createImage(runRight.imageUrl),
                left: createImage(runLeft.imageUrl),
                cropWidth: 341,
                width: 127.875
            }
        };

        // Set the initial image and frame for the player
        this.image = this.sprites.stand.right;
        this.frame = 0;
        this.currentCropWidth = this.sprites.stand.cropWidth;
    }

    // Draw the player on the canvas
    draw() {
        c.drawImage(
            this.image,
            this.currentCropWidth * this.frame,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    // Update the player position and animation frame
    update() {
        this.frame++;

        // Reset frame for standing animation
        if (this.frame > 59 && (this.image === this.sprites.stand.right || this.image === this.sprites.stand.left)) {
            this.frame = 0;
        }

        // Reset frame for running animation
        if (this.frame > 29 && (this.image === this.sprites.run.right || this.image === this.sprites.run.left)) {
            this.frame = 0;
        }

        this.draw();

        // Update player position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Apply gravity if the player is above the bottom of the canvas
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }
}

// Function to create an image object
function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
}

// Start the game by playing the start audio
start.play();

// Create image objects for platforms and background
var platImage = createImage(platformImg.imageUrl);
var backImage = createImage(bgImg.imageUrl);
var smallImage = createImage(smallPlatImg.imageUrl);

// Platform class definition
class Platform {
    constructor(x, y, image) {
        this.position = { x: x, y: y };
        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    // Draw the platform on the canvas
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

// Class for small platforms
class smallPlat {
    constructor(x, y, image) {
        this.position = { x: x, y: y };
        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    // Draw the small platform on the canvas
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

// GenericObject class for background and other static images
class GenericObject {
    constructor(x, y, image) {
        this.position = { x: x, y: y };
        this.image = image;
    }

    // Draw the generic object on the canvas
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

// Initialize the player and platforms
let player = new Player();
let platforms = [];

// Add platforms to the platforms array
const xp = platImage.width - 2;
const yp = canvas.height - platImage.height;
platforms.push(new Platform(xp, yp, platImage));
platforms.push(new Platform(xp * 2, yp, platImage));
platforms.push(new Platform(xp * 4, yp, platImage));

// Add small platforms to the platforms array
const xs = 0;
const ys = 0;
platforms.push(new Platform(xs, ys, smallImage));
platforms.push(new Platform(xs * 2, ys, smallImage));
platforms.push(new Platform(xs * 4, ys, smallImage));

// Define keys for user input
let keys = {
    up: { pressed: false },
    right: { pressed: false },
    left: { pressed: false }
};

// Initialize screen offset and generic objects
let ScreenOffSet = 0;
let generic0bjects = [
    new GenericObject(-1, -1, backImage),
    new GenericObject(-1, -1, createImage(hillImg.imageUrl))
];

// Initialize function to set up the game state
function init() {
    start.play();

    platImage = createImage(platformImg.imageUrl);
    backImage = createImage(bgImg.imageUrl);

    player = new Player();
    platforms = [];

    // Add platforms to the platforms array
    for (let i = 0; i < 3; i++) {
        const xp = (platImage.width - 2) * i;
        const yp = canvas.height - platImage.height;
        platforms.push(new Platform(xp, yp, platImage));
        console.log("making");
    }

    ScreenOffSet = 0;
    generic0bjects = [
        new GenericObject(-1, -1, backImage),
        new GenericObject(-1, -1, createImage(hillImg.imageUrl))
    ];
}

// Define the speed of the player
let speed = 5;

// Animation loop to update and draw the game state
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Draw generic objects (background, etc.)
    generic0bjects.forEach(generic0bject => {
        generic0bject.draw();
    });

    // Draw platforms
    platforms.forEach(platform => {
        platform.draw();
    });

    player.update();

    // Handle player movement and collision detection
    platforms.forEach(platform => {
        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = speed;
        } else if (keys.left.pressed && player.position.x > 0) {
            player.velocity.x = -speed;
        } else {
            player.velocity.x = 0;

            if (keys.right.pressed) {
                ScreenOffSet += speed;
                platform.position.x -= speed;
                generic0bjects.forEach(generic0bject => {
                    generic0bject.position.x -= 0.8;
                });
            } else if (keys.left.pressed && ScreenOffSet > 10) {
                ScreenOffSet -= speed;
                platform.position.x += speed;
                generic0bjects.forEach(generic0bject => {
                    generic0bject.position.x += 0.8;
                });
            }
        }

        // Check for collision with platforms
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    });

    // Restart the game if the player falls off the screen
    if (player.position.y > canvas.height) {
        console.log("lose");
        init();
    }
}

animate();

// Event listener for keydown events
addEventListener("keydown", event => {
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            jumpAudio.play();
            player.velocity.y = -40;
            break;
        case "KeyA":
        case "ArrowLeft":
            footAudio.play();
            keys.left.pressed = true;
            player.image = player.sprites.run.left;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
        case "KeyS":
        case "ArrowDown":
            break;
        case "KeyD":
        case "ArrowRight":
            footAudio.play();
            keys.right.pressed = true;
            player.image = player.sprites.run.right;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
        default:
            break;
    }
});

// Event listener for keyup events
addEventListener("keyup", event => {
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            break;
        case "KeyA":
        case "ArrowLeft":
            footAudio.play();
            keys.left.pressed = false;
            player.image = player.sprites.stand.left;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
        case "KeyS":
        case "ArrowDown":
            break;
        case "KeyD":
        case "ArrowRight":
            footAudio.play();
            keys.right.pressed = false;
            player.image = player.sprites.stand.right;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
        default:
            break;
    }
});

init();
