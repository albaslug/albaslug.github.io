function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀' : '☾';
    });
}

function glitchTimestamps() {

    const timeFragments = document.querySelectorAll('.corruptible');

    timeFragments.forEach(element => {
        const originalText = element.textContent;
        element.innerHTML = '';
        const corruptionLevel = parseInt(element.parentElement.getAttribute('data-corruption-level') || 0);
        for (let i = 0; i < originalText.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.className = 'digit';
            charSpan.textContent = originalText[i];
            const isTasty = /[0-9:?MSK]/.test(originalText[i]);
            const baseCorruptionChance = isTasty ? 0.15 : 0.05;
            const adjustedChance = baseCorruptionChance * corruptionLevel / 4;
            if (corruptionLevel > 0 && isTasty) {
                startCharacterCorruption(charSpan, adjustedChance, corruptionLevel);
            }

            element.appendChild(charSpan);
        }
    });

}

function startCharacterCorruption(charElement, chance, level) {
    const glitchChars = {
        level1: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', 'M', 'S', 'K', ' '],
        level2: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', 'M', 'S', 'K', ' ', '?', '!', '#'],
        level3: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', 'M', 'S', 'K', ' ', '?', '!', '#', 'P', 'B', '⏇', '⍱', '~', '⌤', '⍢', '⌅', '⌆', '⌇', '⌇', '⍋', '}', '{', '⏟', '⏞', '[', ']']
    };
    let charSet;
    if (level <= 2) {
        charSet = glitchChars.level1;
    } else if (level <= 6) {
        charSet = glitchChars.level2;
    } else {
        charSet = glitchChars.level3;
    }
    const originalChar = charElement.textContent;
    const minInterval = Math.max(6000 - (level * 800), 200);
    const maxInterval = Math.max(12000 - (level * 1000), 2000);

    function randomizeChar() {
        if (Math.random() < chance) {
            charElement.textContent = charSet[Math.floor(Math.random() * charSet.length)];
            setTimeout(() => {
                charElement.textContent = originalChar;
            }, Math.random() * 400 + 100);
        }
        const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval;
        setTimeout(randomizeChar, nextInterval);
    }

    const initialDelay = Math.random() * 5000;
    setTimeout(randomizeChar, initialDelay);
}

function initLinesBackgroundPattern() {
    const patternContainer = document.getElementById('patternBackground');
    if (!patternContainer) return;

    const lineCount = 30;
    for (let i = 0; i < lineCount; i++) {
        createLine(patternContainer);
    }
    setInterval(() => {
        if (Math.random() < 0.3) {
            createLine(patternContainer);
            if (patternContainer.children.length > lineCount * 1.5) {
                const lineToRemove = patternContainer.children[Math.floor(Math.random() * patternContainer.children.length)];
                lineToRemove.style.opacity = '0';
                setTimeout(() => {
                    if (lineToRemove.parentNode === patternContainer) {
                        patternContainer.removeChild(lineToRemove);
                    }
                }, 3000);
            }
        }
        const lines = patternContainer.querySelectorAll('.pattern-line');
        lines.forEach(line => {
            if (Math.random() < 0.1) {
                const newOpacity = Math.random() * 0.3 + 0.1;
                line.style.opacity = newOpacity.toString();
            }
        });
    }, 5000);
}

function createLine(container) {
    const line = document.createElement('div');
    line.className = 'pattern-line';
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const length = Math.random() * 150 + 50;
    const angle = Math.random() * 360;
    line.style.width = `${length}px`;
    line.style.height = '1px';
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.opacity = (Math.random() * 0.2 + 0.1).toString();
    container.appendChild(line);
    return line;
}
