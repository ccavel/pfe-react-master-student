import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

// import { addDnDHandlers } from 'C:/Users/CAROLINE/Documents/GitHub/pfe-react-master/src/utils/drag-n-drop/dragNdrop';
import { addDnDHandlers } from 'utils/drag-n-drop/dragNdrop';

import { setXYRValue, selectAllSubdomain } from './seismograph.helpers';
import data from './seismograph.data';
import './SeismographPage.css';

const { tabCues } = data;

const SeismographPage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const tabCueXYR = setXYRValue(tabCues);
        const nameSubdomains = selectAllSubdomain(tabCues);
        const nbSubdomain = nameSubdomains.length;

        // création de la légende de gauche
        for (let j = 0; j < nameSubdomains.length; j++) {
            document.getElementById(
                'columns'
            ).innerHTML += `<li class="column" draggable="true"><header>${nameSubdomains[j]}</header></li>`;
        }
        const eltColumnTab = document.getElementsByClassName('column');
        for (let k = 0; k < eltColumnTab.length; k++) {
            addDnDHandlers(eltColumnTab[k]);
        }

        // BUBBLE CHART
        // eslint-disable-next-line no-new
        new Chart(canvasRef.current, {
            type: 'bubble',
            data: {
                labels: ['Sismograph'],
                datasets: [
                    {
                        label: 'Cue',
                        backgroundColor: 'rgba(255,0,0,0.6)',
                        data: tabCueXYR,
                    },
                ],
            },
            options: {
                events: ['click'],
                responsive: true,
                padding: 30,
                legend: {
                    display: true,
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Sismograph',
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: nbSubdomain,
                                stepSize: 1,
                                // callback: function(value, index, values) {
                                //     return nameSubdomains[value];
                                // },
                                callback: () => '',
                                lineHeight: 20,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                stepSize: 1,
                                callback: (value) => {
                                    const year = value
                                        .toString()
                                        .substring(0, 4);
                                    const month = value
                                        .toString()
                                        .substring(4, 6);
                                    const day = value
                                        .toString()
                                        .substring(6, 8);
                                    const date = `${day}/${month}/${year}`;
                                    return date;
                                },
                            },
                        },
                    ],
                },
            },
        });
    }, []);

    return (
        <div className="title">
            <h2>Sismographe (all CCIR included)</h2>
            <div className="container">
                <div className="margin">
                    <ul id="columns" />
                </div>
                <div className="sismographContainer">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
};
export default SeismographPage;
