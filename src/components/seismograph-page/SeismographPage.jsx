import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { DateTime } from 'luxon';

import cueData from 'components/seismograph-page/seismograph.data';
import { getSubdomains, buildSeismographData, orderSeismographDataBySubDomain, SEISMOGRAPH_DATE_FORMAT } from 'utils/multidomain';

import './SeismographPage.css';

const { tabCues } = cueData;

const SeismographPage = () => {
    const canvasRef = useRef();
    const [subdomains, setSubDomains] = useState(getSubdomains(tabCues));

    useEffect(() => {
        const seismographData = buildSeismographData(tabCues);
        const orderedData = orderSeismographDataBySubDomain(seismographData, subdomains);
        // eslint-disable-next-line no-new
        new Chart(canvasRef.current, {
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
            options: {
                events: ['click'],
                responsive: true,
                padding: 30,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: 'white',
                    },
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: 'white',
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
                                color: 'white',
                            },
                            ticks: {
                                fontColor: 'white',
                                stepSize: 1,
                                callback: (value) => DateTime.fromFormat(value.toString(), SEISMOGRAPH_DATE_FORMAT).toFormat('dd/MM/yyyy'),
                            },
                        },
                    ],
                },
            },
        });
    }, [subdomains]);

    return (
        <div className="seismograph-page">
            <h2>Sismographe (all CCIR included)</h2>
            <div className="container">
                <div className="subdomains">
                    {subdomains
                        .map((subdomain) => (
                            <div
                                key={subdomain}
                                draggable="true"
                                onDragStart={(ev) => ev.dataTransfer.setData('text', subdomain)}
                                onDragOver={(ev) => ev.preventDefault()}
                                onDrop={(ev) => {
                                    const source = ev.dataTransfer.getData('text');
                                    const target = subdomain;
                                    const indexSource = subdomains.indexOf(source);
                                    const indexTarget = subdomains.indexOf(target);
                                    const swap = [...subdomains];
                                    swap[indexSource] = target;
                                    swap[indexTarget] = source;
                                    setSubDomains(swap);
                                }}
                            >
                                {subdomain}
                            </div>
                        )).reverse() // Div are rendered in the oposite order compared to the graph
                    }
                </div>
                <canvas
                    id="myChart"
                    ref={canvasRef}
                />
            </div>
        </div>
    );
};

export default SeismographPage;
