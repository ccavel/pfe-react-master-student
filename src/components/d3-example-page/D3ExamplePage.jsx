import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

import "./D3ExamplePage.css";
//import { string } from 'prop-types';

var cue1 = {
    action: [
        {
            id: "1",
            startDate: "2020-10-02T15:16:42.427Z"
        }
    ],
    description: "desc1",
    iconType: "string",
    id: "string",
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ["1"],
    name: "cue n°1",
    number: 0,
    occurences: [
        {
            minedDocumentId: "string",
            miningState: true,
            sourceQuality: 0,
            computationTime: "2020-10-02T15:16:42.427Z",
            lat: 0,
            lon: 0,
            cueEventId: "string"
        }
    ],
    lat: 0,
    lon: 0,
    icon: "string",
    subdomain: "Political",
    warningCriteriaDayRed: "COM",
    warningCriteriaNightRed: "COM",
    weighting: 5,
    emergenceOriginId: "string"
};
var cue2 = {
    action: [
        {
            id: "2",
            startDate: "2020-10-03T15:11:12.727Z"
        }
    ],
    description: "desc2",
    iconType: "string",
    id: "string",
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ["2"],
    name: "cue n°2",
    number: 0,
    occurences: [
        {
            minedDocumentId: "string",
            miningState: true,
            sourceQuality: 0,
            computationTime: "2020-10-03T15:11:12.727Z",
            lat: 0,
            lon: 0,
            cueEventId: "string"
        }
    ],
    lat: 0,
    lon: 0,
    icon: "string",
    subdomain: "Political",
    warningCriteriaDayRed: "COM",
    warningCriteriaNightRed: "COM",
    weighting: 15,
    emergenceOriginId: "string"
};
var cue3 = {
    action: [
        {
            id: "3",
            startDate: "2020-10-05T15:21:34.122Z"
        }
    ],
    description: "desc3",
    iconType: "string",
    id: "string",
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ["3"],
    name: "cue n°3",
    number: 0,
    occurences: [
        {
            minedDocumentId: "string",
            miningState: true,
            sourceQuality: 0,
            computationTime: "2020-10-05T15:21:34.122Z",
            lat: 0,
            lon: 0,
            cueEventId: "string"
        }
    ],
    lat: 0,
    lon: 0,
    icon: "string",
    subdomain: "Cyber",
    warningCriteriaDayRed: "COM",
    warningCriteriaNightRed: "COM",
    weighting: 25,
    emergenceOriginId: "string"
};

var cue4 = {
    action: [
        {
            id: "3",
            startDate: "2020-10-05T15:21:34.122Z"
        }
    ],
    description: "desc3",
    iconType: "string",
    id: "string",
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ["3"],
    name: "cue n°3",
    number: 0,
    occurences: [
        {
            minedDocumentId: "string",
            miningState: true,
            sourceQuality: 0,
            computationTime: "2020-10-05T15:21:34.122Z",
            lat: 0,
            lon: 0,
            cueEventId: "string"
        }
    ],
    lat: 0,
    lon: 0,
    icon: "string",
    subdomain: "Air",
    warningCriteriaDayRed: "COM",
    warningCriteriaNightRed: "COM",
    weighting: 17,
    emergenceOriginId: "string"
};
var tabCues = [cue1, cue2, cue3, cue4];

function selectAllSubdomain() {
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
    console.log("tab subdomain : " + tabSubdomains);
    return tabSubdomains;
}

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
    console.debug("setXYRvalue");
    var tabY = setYValue();
    var tabCueXYR = [];
    var compteur = 0;
    var x, y, r;
    for (let i = 0; i < tabCues.length; i++) {
        console.log(
            "substring : " + tabCues[i].action[0].startDate.substring(8, 10)
        );
        x = parseInt(tabCues[i].action[0].startDate.substring(8, 10));
        r = tabCues[i].weighting;
        y = tabY[compteur] + 0.5;
        console.log("x = " + x);
        console.log("y = " + y);
        console.log("r = " + r);
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

        //GESTION DU DRAG AND DROP
        (function() {
            var dndHandler = {
                draggedElement: null,

                applyDragEvents: function(element) {
                    element.draggable = true;

                    var dndHandler = this; // Nécessaire pour que l'événement « dragstart » ci-dessous accède facilement au namespace « dndHandler »

                    element.addEventListener("dragstart", function(e) {
                        dndHandler.draggedElement = e.target; // Sauvegarde l'élément en cours de déplacement
                        e.dataTransfer.setData("text/plain", ""); // Nécessaire pour Firefox
                    });
                },

                applyDropEvents: function(dropper) {
                    dropper.addEventListener("dragover", function(e) {
                        e.preventDefault(); // On autorise le drop d'éléments
                        this.className = "dropper drop_hover"; // style de la zone de drop quand un élément la survole
                    });

                    dropper.addEventListener("dragleave", function() {
                        this.className = "dropper"; // style lorsque l'élément quitte la zone de drop
                    });

                    var dndHandler = this;

                    dropper.addEventListener("drop", function(e) {
                        var target = e.target,
                            draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                            clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément

                        while (target.className.indexOf("dropper") === -1) {
                            // Cette boucle permet de remonter jusqu'à la zone de drop parente
                            target = target.parentNode;
                        }

                        target.className = "dropper"; // Application du style par défaut

                        clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
                        dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()

                        draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément d'origine
                    });
                }
            };

            var elements = document.querySelectorAll(".draggable"), // Récupération de tous les éléments "draggable" de la page
                elementsLen = elements.length;

            for (var i = 0; i < elementsLen; i++) {
                dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux éléments déplaçables
            }

            var droppers = document.querySelectorAll(".dropper"), // Récupération de toutes les zones de drop
                droppersLen = droppers.length;

            for (var j = 0; j < droppersLen; j++) {
                dndHandler.applyDropEvents(droppers[j]); // Application des événements nécessaires aux zones de drop
            }
        })();

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
                                callback: function(value, index, values) {
                                    return nameSubdomains[value];
                                },
                                lineHeight: 20
                            }
                        }
                    ]
                }
            }
        });
    }, []);

    return (
        <div className="margin">
            <div className="dropper">
                <div className="draggable">#1</div>
                <div className="draggable">#2</div>
                <div className="draggable">#3</div>
            </div>
            <div className="chartjs-example-page">
                <a>Sismographe (all CCIR included)</a>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

export default ChartJsExamplePage;
