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
}

function plotReal(a, d) {
    function equation(x, a, d) {
        const sqrtValue = Math.sqrt((1 - a * x ** 2) / (1 - d * x ** 2));
        return [sqrtValue, -sqrtValue];
    }

    const xValues = [];
    const step = 0.00005;
    for (let x = -5; x <= 5; x += step) {
        xValues.push(x);
    }

    const positiveYValues = xValues.map(x => equation(x, a, d).find(y => y >= 0));
    const negativeYValues = xValues.map(x => equation(x, a, d).find(y => y < 0));

    const positiveTrace = {
        x: xValues,
        y: positiveYValues,
        mode: 'lines',
        line: {
            color: 'black',
            width: 2
        },
        hoverinfo: 'x+y',
        showlegend: false
    };

    const negativeTrace = {
        x: xValues,
        y: negativeYValues,
        mode: 'lines',
        line: {
            color: 'black',
            width: 2
        },
        hoverinfo: 'x+y',
        showlegend: false
    };

    const layout = {
        title: 'twisted Edwardsova krivka v R^2',
        xaxis: {
            title: 'Os x',
            scaleanchor: 'y',
            scaleratio: 1
        },
        yaxis: {
            title: 'Os y'
        },
        aspectratio: {
            x: 1,
            y: 1
        },
        font: {
            family: 'Audiowide-Regular'
        }
    };

    let modeBarButtons = [["toImage"]];
    
    Plotly.react('graphReal', [positiveTrace, negativeTrace], layout, { modeBarButtons: modeBarButtons }).then(() => {
        Plotly.relayout('graphReal', {
            'xaxis.range': [-5, 5],
            'yaxis.range': [-5, 5]
        });
    });
}