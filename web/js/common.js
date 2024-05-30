aInput = document.getElementById('aInput');
dInput = document.getElementById('dInput');
pointsDiv = document.getElementById('pointsDiv');
curveEquation = document.getElementById('curveEquation');

function showError(element, errorMessage) {
    element.style.display = 'flex';
    element.innerHTML = errorMessage;
    element.style.marginTop = '0.5em';
}

function hideError(element) {
    element.innerHTML = '';
    element.style.display = 'none';
    element.style.marginTop = '0';
}

function updateDropdown(selectElement, options) {
    selectElement.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

function updateDropdowns(p) {
    const residues = getResidues(p);
    const nonResidues = [];
    
    for (let i = 1; i < p; i++) {
        if (!residues.includes(i)) {
            nonResidues.push(i);
        }
    }

    residues.sort((a, b) => a - b);
    nonResidues.sort((a, b) => a - b);

    updateDropdown(aInput, residues);
    updateDropdown(dInput, nonResidues);
}

function updateTexts(numOfPoints, p, a, d) {
    pointsDiv.innerHTML = "Počet bodov na krivke: " + numOfPoints;
    curveEquation.innerHTML = "Rovnica: " + a + "x<sup>2</sup> + y<sup>2</sup> = 1 + " + d + "x<sup>2</sup>y<sup>2</sup> (mod "+ p + ")";
}