class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  // Type Method
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get Full Text of current word
    const fullText = this.words[current];

    // Check if deleting is true
    if (this.isDeleting) {
      // Remove character
      this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // Add Character
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // Insert Txt into Element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If the word is complete
    if (!this.isDeleting && this.txt === fullText) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      // Set delete to false
      this.isDeleting = false;
      // Movee to the next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);
// Init App
function init() {
  const txtElement = document.querySelector(".text-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}
