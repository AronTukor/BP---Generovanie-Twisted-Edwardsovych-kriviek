document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        p: document.getElementById('pInput'),
        a: document.getElementById('aInput'),
        d: document.getElementById('dInput')
    };

    const graphBtn = document.getElementById('graphBtn');
    const graphRealBtn = document.getElementById('graphRealBtn');
    const orderBtn = document.getElementById('orderBtn');
    const graph = document.getElementById('graph');
    const graphReal = document.getElementById('graphReal');
    const table = document.getElementById('table');

    table.style.display = 'none';
    graph.style.display = 'none';
    graphReal.style.display = 'none';

    function handleSubmitOrder() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);
    
        const pointsData = getPoints(p, a, d);
        
        updateTexts(pointsData.length, p, a, d);
        graph.style.display = 'none';
        graphReal.style.display = 'none';

        const firstElementsByOrder = [];

        pointsData.forEach(point => {
            const cycle = [];
            let currentX = point.x;
            let currentY = point.y;
            cycle.push({ x: point.x, y: point.y });

            do {
                const result = handleResult(addPoints(currentX, currentY, point.x, point.y, p, a, d), p);
                cycle.push({ x: result[0], y: result[1] });
                currentX = result[0];
                currentY = result[1];
            } while (currentX !== point.x || currentY !== point.y);

            cycle.pop();
            const order = cycle.length;

            if (!firstElementsByOrder[order]) {
                firstElementsByOrder[order] = [];
            }
            firstElementsByOrder[order].push(cycle[0]);
        });

        const simplifiedArray = firstElementsByOrder.map(cycle => {
            if (!cycle) {
                return null;
            }
        
            const absPoints = [];
        
            cycle.forEach(point => {
                const absX = Math.abs(point.x);
                const absY = Math.abs(point.y);
                const key = `${absX},${absY}`;
        
                if (!absPoints[key]) {
                    absPoints[key] = [];
                }
                absPoints[key].push(point);
            });
        
            const simplifiedCycle = Object.values(absPoints).map(points => {
                if (points.length === 1) {
                    return { x: points[0].x, y: points[0].y };
                } else {
                    if (points.length === 4) {
                        return { x: `±${points[0].x}`, y: `±${points[0].y}` };
                    } else {
                        if (points[0].x === points[1].x) {
                            return { x: `${points[0].x}`, y: `±${points[0].y}` }; 
                        } else {
                            return { x: `±${points[0].x}`, y: `${points[0].y}` }; 
                        }
                    }
                }
            });
        
            return simplifiedCycle;
        });

        const tableBody = document.querySelector('#table table tbody');
        tableBody.innerHTML = '';

        simplifiedArray.forEach((cycle, index) => {
            const row = document.createElement('tr');
            
            const orderCell = document.createElement('td');
            orderCell.classList.add('text-center', 'table-dark');
            orderCell.textContent = index;
            row.appendChild(orderCell);

            if (cycle) {
                const pointsForOrder = [];

                cycle.forEach((point, pointIndex) => {
                    const pointSpan = document.createElement('span');
                    pointSpan.classList.add('point');
                    if (pointIndex !== 0) {
                        pointSpan.textContent = '; ';
                    }
                    pointSpan.innerHTML += `<strong>(${point.x}, ${point.y})</strong>`;
                    pointsForOrder.push(pointSpan);
                });
                
                const pointsCell = document.createElement('td');
                pointsCell.classList.add('text-center');
                pointsForOrder.forEach(pointSpan => {
                    pointsCell.appendChild(pointSpan);
                });
                row.appendChild(pointsCell);
            }

            tableBody.appendChild(row);
        });

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
        
    const primes = getPrimes(100);
    updateDropdown(inputs.p, primes);

    inputs.p.addEventListener('input', function() {
        const p = parseInt(this.value);
        updateDropdowns(p);
    });
    
    graphBtn.addEventListener('click', handleSubmitGraph);
    graphRealBtn.addEventListener('click', handleSubmitGraphReal);
    orderBtn.addEventListener('click', handleSubmitOrder);
});