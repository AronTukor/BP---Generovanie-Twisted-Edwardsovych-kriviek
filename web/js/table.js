document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        p: document.getElementById('pInput'),
        a: document.getElementById('aInput'),
        d: document.getElementById('dInput')
    };

    const graphBtn = document.getElementById('graphBtn');
    const graphRealBtn = document.getElementById('graphRealBtn');
    const tableBtn = document.getElementById('tableBtn');
    const graph = document.getElementById('graph');
    const graphReal = document.getElementById('graphReal');
    const table = document.getElementById('table');

    table.style.display = 'none';
    graph.style.display = 'none';
    graphReal.style.display = 'none';

    function handleSubmitTable() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);
        const points = getPoints(p, a, d);
        const n = points.length;

        updateTexts(n, p, a, d);
        graph.style.display = 'none';
        graphReal.style.display = 'none';
    
        const tableBody = document.querySelector('#table table tbody');
        const tableHeaderRow = document.querySelector('#table table thead tr');
        tableBody.innerHTML = '';
        tableHeaderRow.innerHTML = '';
    
        let headerCell = document.createElement('th');
        headerCell.textContent = '';
        tableHeaderRow.appendChild(headerCell);
    
        points.forEach(point => {
            headerCell = document.createElement('th');
            headerCell.classList.add('text-center');
            headerCell.textContent = `(${point.x},${point.y})`;
            tableHeaderRow.appendChild(headerCell);
        });
    
        for (let i = 0; i < n; i++) {
            const row = document.createElement('tr');
            const headerCell = document.createElement('th');
            headerCell.classList.add('table-dark');
            headerCell.classList.add('text-center');
            headerCell.textContent = `(${points[i].x},${points[i].y})`;
            row.appendChild(headerCell);
    
            for (let j = 0; j < n; j++) {
                const result = handleResult(addPoints(points[i].x, points[i].y, points[j].x, points[j].y, p, a, d), p);
                const cell = document.createElement('td');
                cell.classList.add('text-center');
                cell.textContent = `(${result[0]},${result[1]})`;
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
    
        table.style.display = 'flex';
    }

    function handleSubmitGraph() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);
        const pointsData = getPoints(p, a, d);
        
        updateTexts(pointsData.length, p, a, d);
        graph.style.display = 'flex';
        graphReal.style.display = 'none';
        table.style.display = 'none';
        plotPoints(pointsData);
    }

    function handleSubmitGraphReal() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);
        const pointsData = getPoints(p, a, d);
        
        updateTexts(pointsData.length, p, a, d);
        graphReal.style.display = 'flex';
        graph.style.display = 'none';
        table.style.display = 'none';
        plotReal(a, d);
    }

    const primes = getPrimes(50);
    updateDropdown(inputs.p, primes);

    inputs.p.addEventListener('input', function() {
        const p = parseInt(this.value);
        updateDropdowns(p);
    });
    
    graphBtn.addEventListener('click', handleSubmitGraph);
    graphRealBtn.addEventListener('click', handleSubmitGraphReal);
    tableBtn.addEventListener('click', handleSubmitTable);
});