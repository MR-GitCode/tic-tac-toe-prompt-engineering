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
                symbol = 'o'; // o für Kreis
            } else if (fields[index] === 'cross') {
                symbol = 'x'; // x für Kreuz
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
