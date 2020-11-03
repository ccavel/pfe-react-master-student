import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './D3ExamplePage.css';
import data from './data';

const { tabCues } = data;

function selectAllSubdomain() {
    // fonction qui renvoie un tableau avec les subdomains utilisé (sans doublons)
    const tabSubdomains = [];
    let double = false;
    for (let i = 0; i < tabCues.length; i++) {
        for (let j = 0; j < tabSubdomains.length; j++) {
            if (tabCues[i].subdomain === tabSubdomains[j]) {
                double = true;
            }
        }
        if (double === false) {
            tabSubdomains.push(tabCues[i].subdomain);
        }
        double = false;
    }
    return tabSubdomains;
}

// fonction qui trie les cue en fonction de leur subdomain en leur attribuant une valeur Y
// elle renvoie un tableau contenant les coordonnées Y des cues à la suite
function setYValue() {
    const tabSubdomains = selectAllSubdomain();
    const tabY = [];
    for (let i = 0; i < tabCues.length; i++) {
        for (let j = 0; j < tabSubdomains.length; j++) {
            if (tabCues[i].subdomain === tabSubdomains[j]) {
                tabY.push(j);
            }
        }
    }
    return tabY;
}

function setXYRValue() {
    // fonction qui renvoie un tableau contenant les coordonnées X,Y et R pour chaque cue
    const tabY = setYValue();
    const tabCueXYR = [];
    let compteur = 0;
    let x; let y; let
        r;
    for (let i = 0; i < tabCues.length; i++) {
        x = parseInt(
            tabCues[i].action[0].startDate.substring(0, 4) +
                tabCues[i].action[0].startDate.substring(5, 7) +
                tabCues[i].action[0].startDate.substring(8, 10)
        );
        r = tabCues[i].weighting;
        y = tabY[compteur] + 0.5;
        tabCueXYR.push({ x, y, r });
        compteur++;
    }
    return tabCueXYR;
}

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const tabCueXYR = setXYRValue();
        const nameSubdomains = selectAllSubdomain();
        const nbSubdomain = nameSubdomains.length;

        // création de la légende de gauche
        for (let j = 0; j < nameSubdomains.length; j++) {
            document.getElementById('columns').innerHTML +=
                `<li class="column" draggable="true"><header>${
                    nameSubdomains[j]
                }</header></li>`;
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
                                    const year = value.toString().substring(0, 4);
                                    const month = value
                                        .toString()
                                        .substring(4, 6);
                                    const day = value.toString().substring(6, 8);
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

export default ChartJsExamplePage;
