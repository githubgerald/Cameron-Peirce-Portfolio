// src/index.ts
let words = document.querySelectorAll(".word");
words.forEach(word => {
  if (word.textContent) {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach(letter => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.className = "letter";
      word.append(span);
    });
  }
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
(words[currentWordIndex] as HTMLElement).style.opacity = "1";

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      (letter as HTMLElement).className = "letter out";
    }, i * 80);
  });

  (nextWord as HTMLElement).style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    (letter as HTMLElement).className = "letter behind";
    setTimeout(() => {
      (letter as HTMLElement).className = "letter in";
    }, 340 + i * 80);
  });

  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);
