const text = document.getElementById('dynamic-text');
const letters = text.textContent.split('').map(letter => {
  const span = document.createElement('span');
  span.textContent = letter;
  return span;
});

// Clear text and append letter spans
text.textContent = '';
letters.forEach(span => text.appendChild(span));

function animateFont() {
  letters.forEach((span, index) => {
    // Increased speed by adjusting the time factor (from /10 to /5)
    // Reduced the position offset multiplier (from 50 to 30) for smoother transitions
    const offset = (Date.now() / 10 + index * 30) % 600;
    
    // Smoothed the animation by reducing the sine wave amplitude
    // Changed from 300 to 200 for weight and 50 to 30 for width
    const weight = 400 + Math.sin(offset * 0.01) * 200;
    const width = 100 + Math.sin(offset * 0.01) * 30;

    span.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
  });
  
  requestAnimationFrame(animateFont);
}

animateFont();
