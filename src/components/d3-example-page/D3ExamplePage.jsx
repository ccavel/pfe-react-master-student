import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

import "./D3ExamplePage.css";
import data from './data';
//import { string } from 'prop-types';

const { tabCues } = data;

function selectAllSubdomain() {
    //fonction qui renvoie un tableau avec les subdomains utilisé (sans doublons)
    var tabSubdomains = [];
    var double = false;
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

//fonction qui trie les cue en fonction de leur subdomain en leur attribuant une valeur Y
//elle renvoie un tableau contenant les coordonnées Y des cues à la suite
function setYValue() {
    var tabSubdomains = selectAllSubdomain();
    var tabY = [];
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
    //fonction qui renvoie un tableau contenant les coordonnées X,Y et R pour chaque cue
    var tabY = setYValue();
    var tabCueXYR = [];
    var compteur = 0;
    var x, y, r;
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

        //création de la légende de gauche
        for (let j = 0; j < nameSubdomains.length; j++) {
            document.getElementById("columns").innerHTML +=
                '<li class="column" draggable="true"><header>' +
                nameSubdomains[j] +
                "</header></li>";
        }

        // BUBBLE CHART
        const myBubbleChart = new Chart(canvasRef.current, {
            type: "bubble",
            data: {
                labels: ["Sismograph"],
                datasets: [
                    {
                        label: "Cue",
                        backgroundColor: "rgba(255,0,0,0.6)",
                        data: tabCueXYR
                    }
                ]
            },
            options: {
                events: ["click"],
                responsive: true,
                padding: 30,
                legend: {
                    display: true,
                    position: "right"
                },
                title: {
                    display: true,
                    text: "Sismograph"
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
                                callback: function(value, index, values) {
                                    //ne pas afficher la valeur de l'échelle verticale
                                    return "";
                                },
                                lineHeight: 20
                            }
                        }
                    ],
                    xAxes: [
                        {
                            ticks: {
                                stepSize: 1,
                                callback: function(value, index, values) {
                                    var year = value.toString().substring(0, 4);
                                    var month = value
                                        .toString()
                                        .substring(4, 6);
                                    var day = value.toString().substring(6, 8);
                                    var date = day + "/" + month + "/" + year;
                                    return date;
                                }
                            }
                        }
                    ]
                }
            }
        });
    }, []);

    return (
        <div className="title">
            <h2>Sismographe (all CCIR included)</h2>

            <div className="container">
                <div className="margin">
                    <ul id="columns"></ul>
                </div>

                <div className="sismographContainer">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
};

export default ChartJsExamplePage;
