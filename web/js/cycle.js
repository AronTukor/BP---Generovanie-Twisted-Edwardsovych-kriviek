document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        p: document.getElementById('pInput'),
        a: document.getElementById('aInput'),
        d: document.getElementById('dInput'),
        x: document.getElementById('selectedPointX'),
        y: document.getElementById('selectedPointY')
    };

    const pointError = document.getElementById('pointError');
    const graphBtn = document.getElementById('graphBtn');
    const tableForm = document.getElementById('tableForm');
    const tableBtn = document.getElementById('tableBtn');
    const table = document.getElementById('table');

    tableForm.style.display = 'none';
    table.style.display = 'none';

    function plotPoints(data) {
        var graph = document.getElementById('graph'),
            trace = {
                type: 'scatter',
                mode: 'markers',
                x: data.map(point => point.x),
                y: data.map(point => point.y),
                marker: { size: 8 },
            };
    
            data = [trace];
            
            layout = {
                title: 'twisted Edwardsova krivka',
                xaxis: { title: 'Os x' },
                yaxis: { title: 'Os y' },
                hovermode: 'closest',
                font: {
                    family: 'Audiowide-Regular'
                }
            };
    
        let modeBarButtons = [[ "zoom2d", "pan2d", "autoScale2d", "toImage"]];
    
        Plotly.react('graph', data, layout, { modeBarButtons: modeBarButtons });
    
        graph.on('plotly_click', function(data){
            const x = data.points[0].x;
            const y = data.points[0].y;
            inputs.x.value = x;
            inputs.y.value = y;
        });
    }

    function handleSubmitGraph() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);

        const pointsData = getPoints(p, a, d);
        updateTexts(pointsData.length, p, a, d);
        plotPoints(pointsData);
        tableForm.style.display = 'flex';
    }

    function handleSubmitCycle() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);
        const x = parseInt(inputs.x.value);
        const y = parseInt(inputs.y.value);

        if (!isAPoint(p, a, d, x, y)) {
            showError(pointError, 'Bod nie je na krivke!');
            return;
        }

        hideError(pointError);
    
        const tableBody = document.querySelector('#table table tbody');
        const tableHeaderRow = document.querySelector('#table table thead tr');
        tableBody.innerHTML = '';
        tableHeaderRow.innerHTML = '';

        const cycle = [];
        let currentX = x;
        let currentY = y;
        cycle.push({x: x, y: y});

        do {
            const result = handleResult(addPoints(currentX, currentY, x, y, p, a, d), p);
            cycle.push({x: result[0], y: result[1]});
            currentX = result[0];
            currentY = result[1];
        } while (currentX !== x || currentY !== y);

        cycle.pop();
        const count = cycle.length;
    
        let row = document.createElement('tr');
        for (let i = 1; i <= count; i++) {
            let cell = document.createElement('td');
            cell.classList.add('text-center');
            cell.classList.add('table-dark');
            cell.textContent = i;
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    
        row = document.createElement('tr');
        cycle.forEach(point => {
            let cell = document.createElement('td');
            cell.classList.add('text-center');
            cell.textContent = `(${point.x},${point.y})`;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    
        table.style.display = 'flex';
    }
    
    const primes = getPrimes(100);
    updateDropdown(inputs.p, primes);

    inputs.p.addEventListener('input', function() {
        const p = parseInt(this.value);
        updateDropdowns(p);
    });
    
    graphBtn.addEventListener('click', handleSubmitGraph);
    tableBtn.addEventListener('click', handleSubmitCycle);
});