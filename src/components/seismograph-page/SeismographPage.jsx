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
import legend from 'assets/Legende2.png';

import './SeismographPage.css';

const { tabCues } = cueData;

// Colors in the graph
const labelColor = 'white';
const gridLineColor = 'grey';
const ticksColor = 'white';

const SeismographPage = () => {
    // REF: reference to the canvas element, where the chart is rendered
    const canvasRef = useRef();

    // STATE
    const [subdomains, setSubDomains] = useState(getSubdomains(tabCues));
    const [subdomainHeight, setSubdomainHeight] = useState(0);

    // OPTION GRAPHIC STYLE
    const graphOptions = {
        events: [''],
        animation: {
            duration: 0,
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: labelColor,
            },
        },
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 0,
                bottom: 0,
            },
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: gridLineColor,
                    },
                    ticks: {
                        min: 0,
                        max: subdomains.length,
                        stepSize: 1,
                        callback: () => '',
                    },
                },
            ],
            xAxes: [
                {
                    type: 'time',
                    time: {
                        unit: 'hour', // changer le type en fonction du nombre de jour affiché (3-4j --> hour ; 5-20j --> day ; 20j-12mois --> month;sinon year)
                        displayFormats: {
                            minute: 'h:mm a',
                            hour: 'D/MM h:mm a',
                            day: 'D/M/YYYY',
                            month: 'D MM',
                        },
                    },
                    gridLines: {
                        color: gridLineColor,
                    },
                    ticks: {
                        fontColor: ticksColor,
                        stepSize: 1,
                    },
                },
            ],
        },
    };

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
        // eslint-disable-next-line no-new
        const chart = new Chart(canvasRef.current, {
            type: 'bubble',
            data: {
                datasets: [
                    {
                        label: 'Cues appearance and weighting',
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        data: orderedData,
                    },
                ],
            },
            options: graphOptions,
        });
        setSubdomainHeight(chart.scales['y-axis-0'].getPixelForTick(1) - chart.scales['y-axis-0'].getPixelForTick(0));
    }, [graphOptions, subdomains]);

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
                <img
                    src={legend}
                    alt="Légende"
                    width="300"
                    height="100"
                />
            </div>
        </div>
    );
};

export default SeismographPage;
