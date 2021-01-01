/* eslint-disable no-param-reassign */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js';

import cueData from 'components/seismograph-page/seismograph.data';
import { getSubdomains,
    buildSeismographData,
    orderSeismographDataBySubDomain,
    // SEISMOGRAPH_DATE_FORMAT
    // eslint-disable-next-line object-curly-newline
} from 'utils/multidomain';

import './SeismographPage.css';

const { tabCues } = cueData;

// Colors in the graph
// const labelColor = 'white';
const gridLineColor = 'grey';
const ticksColor = 'white';

// Colorization of the circles depending of they size
function colorize(context) {
    const value = context.dataset.data[context.dataIndex];
    let r = 255;
    let g = 235;
    let b = 0;
    // Gestion de l'opacité
    const a = 0.6;
    if (value.r === 15) {
        // a = 0.75;
        r = 255;
        g = 116;
    } else if (value.r === 25) {
        // a = 0.5;
        r = 255;
        g = 0;
    } else if (value.r === 35) {
        // a = 0.28;
        r = 150;
        g = 30;
        b = 30;
    }
    // value.r = 15;
    return `rgba(${r},${g},${b},${a})`;
}
// Select bubble data
function bubbleData(value) {
    const tab = { x: 0, y: 0, r: 0 };
    for (let i = 0; i < value.length; i++) {
        tab.x = value[i].x;
        tab.y = value[i].y;
        tab.r = value[i].r;
    }
    return tab;
}
// Select line data
function lineData(value) {
    const tab = { x: 0, y: 0 };
    for (let i = 0; i < value.length; i++) {
        tab.x = value[i].x;
        tab.y = value[i].y;
    }
    return tab;
}

const SeismographPage = () => {
    // REF: reference to the canvas element, where the chart is rendered
    const canvasRef = useRef();

    // STATE
    const [subdomains, setSubDomains] = useState(getSubdomains(tabCues));
    const [subdomainHeight, setSubdomainHeight] = useState(0);

    // HANDLERS
    /* Source element */
    const handleDragStart = useCallback((event) => {
        event.target.style.opacity = 0.3;
        event.dataTransfer.setData('subdomain', event.target.dataset.subdomain);
        event.target.style.border = '1px solid #fc0';
    }, []);
    const handleDragEnd = useCallback((event) => {
        event.target.style.opacity = '';
        event.target.style.border = '1px solid grey';
    }, []);
    /* Target element */
    const handleDragEnter = useCallback((event) => {
        if (event.target.draggable) {
            event.target.style.background = 'grey';
        }
    }, []);
    const handleDragOver = useCallback((event) => event.preventDefault(), []);
    const handleDragLeave = useCallback((event) => {
        if (event.target.draggable) {
            event.target.style.background = '';
        }
    }, []);
    const handleDrop = useCallback((event) => {
        const source = event.dataTransfer.getData('subdomain');
        const target = event.target.dataset.subdomain;
        const swappedArray = [...subdomains];
        swappedArray[subdomains.indexOf(source)] = target;
        swappedArray[subdomains.indexOf(target)] = source;
        setSubDomains(swappedArray);
        event.target.style.background = '';
    }, [subdomains]);

    // EFFECT SYNCHRONIZATION: Chart will be re-rendered everytime the order of the subdomains changes
    useEffect(() => {
        const seismographData = buildSeismographData(tabCues);
        const orderedData = orderSeismographDataBySubDomain(seismographData, subdomains);

        // Là ça bloque -->
        const tab = bubbleData(orderedData);
        const tab2 = lineData(orderedData);

        const mixedChart = new Chart(canvasRef.current, { type: 'bubble',
            data: {
                datasets: [{
                    label: 'Bubble Dataset',
                    backgroundColor: colorize.bind(false),
                    borderColor: colorize.bind(true),
                    // data: tab,
                    data: [{
                        x: 1.05,
                        y: 3.5,
                        r: 15,
                    }, {
                        x: 1.26,
                        y: 2.5,
                        r: 5,
                    }, {
                        x: 1.30,
                        y: 6.5,
                        r: 5,
                    }, {
                        x: 1.37,
                        y: 5.5,
                        r: 35,
                    }, {
                        x: 1.41,
                        y: 1.5,
                        r: 15,
                    }, {
                        x: 1.49,
                        y: 4.5,
                        r: 5,
                    }, {
                        x: 1.69,
                        y: 1.5,
                        r: 25,
                    }, {
                        x: 1.88,
                        y: 0.5,
                        r: 35,
                    }, {
                        x: 2.01,
                        y: 4.5,
                        r: 35,
                    }, {
                        x: 2.07,
                        y: 5.5,
                        r: 35,
                    }, {
                        x: 2.1,
                        y: 0.5,
                        r: 5,
                    }, {
                        x: 2.2,
                        y: 5.5,
                        r: 5,
                    }, {
                        x: 2.54,
                        y: 5.5,
                        r: 15,
                    }, {
                        x: 2.60,
                        y: 2.5,
                        r: 15,
                    }, {
                        x: 2.68,
                        y: 3.5,
                        r: 25,
                    }, {
                        x: 2.74,
                        y: 4.5,
                        r: 35,
                    }, {
                        x: 2.81,
                        y: 5.5,
                        r: 35,
                    }, {
                        x: 2.89,
                        y: 6.5,
                        r: 35,
                    }, {
                        x: 2.90,
                        y: 6.5,
                        r: 35,
                    }, {
                        x: 2.96,
                        y: 0.5,
                        r: 5,
                    }, {
                        x: 3.02,
                        y: 2.5,
                        r: 5,
                    }, {
                        x: 3.13,
                        y: 0.5,
                        r: 5,
                    }, {
                        x: 3.25,
                        y: 6.5,
                        r: 15,
                    }, {
                        x: 3.46,
                        y: 5.5,
                        r: 15,
                    }, {
                        x: 3.55,
                        y: 0.5,
                        r: 25,
                    }, {
                        x: 3.69,
                        y: 3.5,
                        r: 35,
                    }, {
                        x: 3.77,
                        y: 6.5,
                        r: 35,
                    }, {
                        x: 3.91,
                        y: 4.5,
                        r: 35,
                    }],
                    type: 'bubble',
                    borderWidth: 2,
                }, {
                    type: 'line',
                    label: 'Line Dataset',
                    data: [{
                        x: 1.05,
                        y: 3.5,
                    }, {
                        x: 1.26,
                        y: 2.5,
                    }, {
                        x: 1.30,
                        y: 6.5,
                    }, {
                        x: 1.37,
                        y: 5.5,
                    }, {
                        x: 1.41,
                        y: 1.5,
                    }, {
                        x: 1.49,
                        y: 4.5,
                    }, {
                        x: 1.69,
                        y: 1.5,
                    }, {
                        x: 1.88,
                        y: 0.5,
                    }, {
                        x: 2.01,
                        y: 4.5,
                    }, {
                        x: 2.07,
                        y: 5.5,
                    }, {
                        x: 2.1,
                        y: 0.5,
                    }, {
                        x: 2.2,
                        y: 5.5,
                    }, {
                        x: 2.54,
                        y: 5.5,
                    }, {
                        x: 2.60,
                        y: 2.5,
                    }, {
                        x: 2.68,
                        y: 3.5,
                    }, {
                        x: 2.74,
                        y: 4.5,
                    }, {
                        x: 2.81,
                        y: 5.5,
                    }, {
                        x: 2.89,
                        y: 6.5,
                    }, {
                        x: 2.90,
                        y: 6.5,
                    }, {
                        x: 2.96,
                        y: 0.5,
                    }, {
                        x: 3.02,
                        y: 2.5,
                    }, {
                        x: 3.13,
                        y: 0.5,
                    }, {
                        x: 3.25,
                        y: 6.5,
                    }, {
                        x: 3.46,
                        y: 5.5,
                    }, {
                        x: 3.55,
                        y: 0.5,
                    }, {
                        x: 3.69,
                        y: 3.5,
                    }, {
                        x: 3.77,
                        y: 6.5,
                    }, {
                        x: 3.91,
                        y: 4.5,
                    }],
                    // data: tab2,
                    fill: false,
                    borderWidth: 1,
                    showLine: true,
                    borderColor: 'rgba(250,0,0,1)',
                    lineTension: 0,
                },
                ],
            } });

        setSubdomainHeight(mixedChart.scales['y-axis-0'].getPixelForTick(1) - mixedChart.scales['y-axis-0'].getPixelForTick(0));
    }, [subdomains]);

    return (
        <div className="seismograph-page">
            <h2>Seismographe</h2>
            <div className="container">
                <div className="subdomains">
                    {subdomains.map((subdomain) => (
                        <div
                            key={subdomain}
                            style={{ height: subdomainHeight }}
                            className="subdomain-wrapper"
                        >
                            <div
                                draggable="true"
                                data-subdomain={subdomain}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                            >
                                {subdomain}
                            </div>
                        </div>
                    )).reverse() /* Div are rendered in the oposite order compared to the graph */ }
                </div>
                <div className="chart-container">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
};

export default SeismographPage;
