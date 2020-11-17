/* eslint-disable no-param-reassign */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js';
import { DateTime } from 'luxon';

import cueData from 'components/seismograph-page/seismograph.data';
import { getSubdomains, buildSeismographData, orderSeismographDataBySubDomain, SEISMOGRAPH_DATE_FORMAT } from 'utils/multidomain';

import './SeismographPage.css';

const { tabCues } = cueData;

// Colors in the graph
const labelColor = 'white';
const gridLineColor = 'white';
const ticksColor = 'white';

const SeismographPage = () => {
    // REF: reference to the canvas element, where the chart is rendered
    const canvasRef = useRef();

    // STATE
    const [subdomains, setSubDomains] = useState(getSubdomains(tabCues));
    const [subdomainHeight, setSubdomainHeight] = useState(0);

    // OPTION GRAPHIC STYLE
    const graphOptions = {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: labelColor,
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
                    gridLines: {
                        color: gridLineColor,
                    },
                    ticks: {
                        fontColor: ticksColor,
                        stepSize: 1,
                        callback: (value) => DateTime.fromFormat(value.toString(), SEISMOGRAPH_DATE_FORMAT).toFormat('dd/MM/yyyy'),
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
    }, []);
    const handleDragEnd = useCallback((event) => {
        event.target.style.opacity = '';
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
                        backgroundColor: 'rgba(255, 0, 0, 0.6)',
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
            <h2>Sismographe (all CCIR included)</h2>
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
