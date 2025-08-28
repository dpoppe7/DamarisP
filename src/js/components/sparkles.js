// creates randomized sparkles
export class Sparkles {
  constructor(sparkleCount = 300) {
    this.sparkleCount = sparkleCount;

    // Use a simple array of hex color codes
    this.colors = [
      '#edabd2', // pink-accent
      '#ffae57', // pastel-orange
      '#fcf577', // pastel-yellow
      '#bae67e', // pastel-green
      '#5ccfe6', // pastel-cyan
      '#9cc6f4', // pastel-blue
      '#aa72c5', // pastel-purple
      '#ffffff' // white
    ];
  }

  render() {
    const container = document.createElement("div");
    container.id = "sparkles";
    container.className = "absolute inset-0 z-0 overflow-hidden pointer-events-none";

    for (let i = 0; i < this.sparkleCount; i++) {
      const sparkle = document.createElement("div");
      const size = Math.random() * 3 + 1;
      
      // Get a random hex code directly from the array
      const colorHex = this.colors[Math.floor(Math.random() * this.colors.length)];

      // Apply the common Tailwind classes
      sparkle.className = `absolute rounded-full animate-fade-in-out`;
      
      // Use inline styles to apply the colors directly from the hex code
      sparkle.style.backgroundColor = colorHex;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Also apply the shadow color using the hex code
      sparkle.style.boxShadow = `0 0 ${size * 2}px ${colorHex}`;

      container.appendChild(sparkle);
    }
    document.body.prepend(container);
  }
}