import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

// import { addDnDHandlers } from 'C:/Users/CAROLINE/Documents/GitHub/pfe-react-master/src/utils/drag-n-drop/dragNdrop';
import { addDnDHandlers, namePreviousDropElt, nameDropElt } from 'utils/drag-n-drop/dragNdrop';

import { setXYRValue, selectAllSubdomain, changeYvalue } from './seismograph.helpers';
import cueData from './seismograph.data';
import './SeismographPage.css';

const { tabCues } = cueData;
const tabCueXYR = setXYRValue(tabCues);
const nameSubdomains = selectAllSubdomain(tabCues);
const nbSubdomain = nameSubdomains.length;
const chartData = {
    labels: ['Sismograph'],
    datasets: [
        {
            label: 'Cue',
            backgroundColor: 'rgba(255,0,0,0.6)',
            data: tabCueXYR,
            // data: changeYvalue(nameDropElt, namePreviousDropElt, nameSubdomains, tabCueXYR),
        },
    ],
};
const chartOptions = {
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
};

const SeismographPage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        // const nameSubdomains = selectAllSubdomain(tabCues);
        // const nbSubdomain = nameSubdomains.length;

        // création de la légende de gauche
        for (let j = 0; j < nameSubdomains.length; j++) {
            document.getElementById(
                'columns'
            ).innerHTML += `<li class="column" draggable="true"><header>${nameSubdomains[j]}</header></li>`;
        }
        // création de la légende de gauche
        const eltColumnTab = document.getElementsByClassName('column');
        for (let k = 0; k < eltColumnTab.length; k++) {
            addDnDHandlers(eltColumnTab[k]);
        }
        // const myChart = new Chart(canvasRef.current, {
        const myChart = new Chart(canvasRef.current, {
            type: 'bubble',
            data: chartData,
            options: chartOptions,
        });
        // myChart.dataset.data = changeYvalue(myChart.dataset.data, 2, 1);
        // function randomize() {
        //     chart.dataset.data = changeYvalue(nameDropElt, namePreviousDropElt, nameSubdomains, tabCueXYR)
        //     chart.update();
        // }
        // console.log(`TEST ${document.getElementById('myChart')}`);
        document.ondragend = function (e) {
            console.log('ON DROOOOOP');
        };
        // document.ondragend = function (e) {
        //     e.preventDefault();
        //     console.log('TEST' + myChart);
        //     myChart.dataset.data = changeYvalue(nameDropElt, namePreviousDropElt, nameSubdomains, tabCueXYR);
        //     myChart.update();
        // };
    }, []);

    return (
        <div className="title">
            <h2>Sismographe (all CCIR included)</h2>
            <div className="container">
                <div className="margin">
                    <ul id="columns" />
                </div>
                <div className="sismographContainer">
                    <canvas
                        id="myChart"
                        ref={canvasRef}
                    />
                </div>
            </div>
        </div>
    );
};
export default SeismographPage;
