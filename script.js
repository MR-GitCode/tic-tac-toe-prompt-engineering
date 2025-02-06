let fields = [
    null,
    null,
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
];

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
                symbol = createCircleSVG(); // o für Kreis
            } else if (fields[index] === 'cross') {
                symbol = createCrossSVG(); // x für Kreuz
            }
            tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    
    container.innerHTML = tableHTML;
}

function handleClick(index) {
    // Beispiel für Logik beim Klicken auf ein Feld
    if (!fields[index]) { // Wenn das Feld leer ist
        fields[index] = 'cross'; // Beispiel: immer ein Kreuz setzen
        render(); // Tabelle neu rendern
    }
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
  
  