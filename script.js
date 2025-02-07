let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const winningCombinations = [
    [0, 1, 2], // obere Reihe
    [3, 4, 5], // mittlere Reihe
    [6, 7, 8], // untere Reihe
    [0, 3, 6], // linke Spalte
    [1, 4, 7], // mittlere Spalte
    [2, 5, 8], // rechte Spalte
    [0, 4, 8], // diagonale von links oben nach rechts unten
    [2, 4, 6]  // diagonale von rechts oben nach links unten
];

let currentPlayer = 'circle'; // Startspieler

function init() {
    render();
}

function render() {
    const container = document.getElementById('content');
    let tableHTML = '<table>';
    
    for (let row = 0; row < 3; row++) {
        tableHTML += '<tr>';
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = createCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = createCrossSVG();
            }
            tableHTML += `<td id="cell-${index}" onclick="handleClick(${index})">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    
    container.innerHTML = tableHTML;
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;

        const cell = document.getElementById(`cell-${index}`);
        if (currentPlayer === 'circle') {
            cell.innerHTML = createCircleSVG();
        } else if (currentPlayer === 'cross') {
            cell.innerHTML = createCrossSVG();
        }

        const winner = findWinner(); // Überprüfe auf einen Gewinner
        if (winner) {
            const winnerName = winner === 'circle' ? 'Kreis' : 'Kreuz';
            let winnerDiv = document.getElementById('winner');
            winnerDiv.innerHTML = `${winnerName} hat gewonnen!`; // Zeige den Gewinner im Div an
            return;
        }
    } 
    
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function findWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination; //Wählt Gewinnkombination aus Array aus
        if (
            fields[a] && 
            fields[a] === fields[b] && //Überprüft ob Inhalt aus Feld a und b gleich
            fields[a] === fields[c] //Überprüft ob Inhalt aus Feld a und c gleich
        ) {
            drawLine(combination); // Übergib die Gewinnkombination an drawLine()
            return fields[a]; // Gibt den Gewinner ('circle' oder 'cross') zurück
        }
    }
    return null; // Kein Gewinner
}

function drawLine(combination) {
    const container = document.getElementById('content');
    const startCell = document.getElementById(`cell-${combination[0]}`);
    const endCell = document.getElementById(`cell-${combination[2]}`);

    // Berechne die Mitte der Start- und Endfelder relativ zum Container
    const containerRect = container.getBoundingClientRect();
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 
    const startY = startRect.top + startRect.height / 2 
    const endX = endRect.left + endRect.width / 2 
    const endY = endRect.top + endRect.height / 2 

    // Erstelle ein SVG für die Linie
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
    svg.style.position = 'absolute';
    svg.style.top = '-16px';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none'; // Verhindert Interaktionen mit der Linie

    // Linie erstellen
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', startX); // Startpunkt für Animation
    line.setAttribute('y2', startY); // Startpunkt für Animation
    line.setAttribute('stroke', '#FF0000'); // Farbe der Linie
    line.setAttribute('stroke-width', '5');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
    container.appendChild(svg); // Füge das SVG zum Container hinzu

    // Animation der Linie
    const animationDuration = 1000; // Dauer der Animation in Millisekunden
    const totalLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)); // Gesamtlänge der Linie
    let progress = 0;

    function animateLine() {
        progress += 16 / animationDuration; // Fortschritt basierend auf 60fps
        if (progress > 1) progress = 1;

        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;

        line.setAttribute('x2', currentX);
        line.setAttribute('y2', currentY);

        if (progress < 1) {
            requestAnimationFrame(animateLine);
        }
    }

    requestAnimationFrame(animateLine);
}

function restartGame() {
  // Reset des Spielfelds
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = 'circle';

  // Gewinner-Text zurücksetzen
  const winnerDiv = document.getElementById('winner');
  winnerDiv.innerHTML = '';

  // Neu rendern
  render();
}


function createCircleSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#00b0ef"
          stroke-width="8"
          stroke-dasharray="282.6" /* Umfang des Kreises (2 * Math.PI * Radius) */
          stroke-dashoffset="282.6" /* Startpunkt der Animation */
          style="animation: fillCircle 2s ease-out forwards;"
        />
        <style>
          @keyframes fillCircle {
            to {
              stroke-dashoffset: 0; /* Endpunkt der Animation */
            }
          }
        </style>
      </svg>
    `;
  }

  function createCrossSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Erste Linie des Kreuzes -->
        <line 
          x1="15" y1="15" x2="85" y2="85" 
          stroke="#FFC000"
          stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="99.5" /* Länge der Linie */
          stroke-dashoffset="99.5" /* Startpunkt der Animation */
          style="animation: fillLine1 1s ease-out forwards;"
        />
        
        <!-- Zweite Linie des Kreuzes -->
        <line 
          x1="85" y1="15" x2="15" y2="85" 
          stroke="#FFC000"
          stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="99.5" /* Länge der Linie */
          stroke-dashoffset="99.5" /* Startpunkt der Animation */
          style="animation: fillLine2 1s ease-out forwards 0.5s;" />
          
        <style>
          @keyframes fillLine1 {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes fillLine2 {
            to {
              stroke-dashoffset: 0;
            }
          }
        </style>
      </svg>
    `;
  }
  
  