document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        p: document.getElementById('pInput'),
        a: document.getElementById('aInput'),
        d: document.getElementById('dInput'),
        x1: document.getElementById('selectedPoint1X'),
        y1: document.getElementById('selectedPoint1Y'),
        x2: document.getElementById('selectedPoint2X'),
        y2: document.getElementById('selectedPoint2Y'),
    };

    const errors = {
        p: document.getElementById('pError'),
        p1: document.getElementById('point1Error'),
        p2: document.getElementById('point2Error'),
    };

    const container = document.getElementById('container');
    const graphBtn = document.getElementById('graphBtn');
    const addBtn = document.getElementById('addBtn');
    const resultX = document.getElementById('resultX');
    const resultY = document.getElementById('resultY');

    container.style.display = 'none';

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
    
        let selectedPointIndex = 0;
    
        graph.on('plotly_click', function(data){
            const x = data.points[0].x;
            const y = data.points[0].y;
            
            if (selectedPointIndex === 0) {
                inputs.x1.value = x;
                inputs.y1.value = y;
                selectedPointIndex = 1;
            } else if (selectedPointIndex === 1) {
                inputs.x2.value = x;
                inputs.y2.value = y;
                selectedPointIndex = 0;
            }
        });
    }

    function basicTexts() {
        const pointsDiv = document.getElementById('pointsDiv');
        const curveEquation = document.getElementById('curveEquation');
        pointsDiv.innerHTML = "";
        curveEquation.innerHTML = "Rovnica: ax<sup>2</sup> + y<sup>2</sup> = 1 + dx<sup>2</sup>y<sup>2</sup> (mod p)";
    }

    function handleSubmitGraph() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);

        const num = isPrime(p);

        switch(num) {
            case -1:
                showError(errors.p, 'p musí byť prvočíslo!');
                basicTexts();
                container.style.display = 'none';
                break;
            case 2:
                showError(errors.p, 'p nemôže byť 2!');
                basicTexts();
                container.style.display = 'none';
                break;
            case 1:
                showError(errors.p, p + ' nie je prvočíslo!');
                basicTexts();
                container.style.display = 'none';
                break;
            case 0:
                hideError(errors.p);
            
                const pointsData = getPoints(p, a, d);
                updateTexts(pointsData.length, p, a, d);
                plotPoints(pointsData);
                
                container.style.display = 'flex';
                inputs.x1.value = 0;
                inputs.y1.value = 0;
                inputs.x2.value = 0;
                inputs.y2.value = 0;
                resultX.value = 0;
                resultY.value = 0;

                break;
        }
    }

    function handleSubmitAdd() {
        const p = parseInt(inputs.p.value);
        const a = parseInt(inputs.a.value);
        const d = parseInt(inputs.d.value);
        const x1 = parseInt(inputs.x1.value);
        const y1 = parseInt(inputs.y1.value);
        const x2 = parseInt(inputs.x2.value);
        const y2 = parseInt(inputs.y2.value);

        if (!isAPoint(p, a, d, x1, y1)) {
            hideError(errors.p2);
            showError(errors.p1, 'Bod 1 nie je na krivke!');
            resultX.value = 0;
            resultY.value = 0;
         } else {
            hideError(errors.p1);
            if (!isAPoint(p, a, d, x2, y2)) {
                showError(errors.p2, 'Bod 2 nie je na krivke!');
                resultX.value = 0;
                resultY.value = 0;
            } else {
                hideError(errors.p2);
                const result = handleResult(addPoints(x1, y1, x2, y2, p, a, d), p);
                resultX.value = result[0];
                resultY.value = result[1];
            } 
        }
    }

    inputs.p.addEventListener('input', function() {
        const p = parseInt(this.value);
        updateDropdowns(p);
    });
    
    graphBtn.addEventListener('click', handleSubmitGraph);
    addBtn.addEventListener('click', handleSubmitAdd);
});