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

        //GESTION DU DRAG AND DROP
        (function() {
            var dragSrcEl = null;

            function handleDragStart(e) {
                // Target (this) element is the source node.
                dragSrcEl = this;

                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/html", this.outerHTML);

                this.classList.add("dragElem");
            }
            function handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                this.classList.add("over");

                e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.

                return false;
            }

            function handleDragEnter(e) {
                // this / e.target is the current hover target.
            }

            function handleDragLeave(e) {
                this.classList.remove("over"); // this / e.target is previous target element.
            }

            function handleDrop(e) {
                // this/e.target is current target element.

                if (e.stopPropagation) {
                    e.stopPropagation(); // Stops some browsers from redirecting.
                }

                // Don't do anything if dropping the same column we're dragging.
                if (dragSrcEl != this) {
                    // Set the source column's HTML to the HTML of the column we dropped on.
                    this.parentNode.removeChild(dragSrcEl);
                    var dropHTML = e.dataTransfer.getData("text/html");
                    this.insertAdjacentHTML("beforebegin", dropHTML);
                    var dropElem = this.previousSibling;
                    addDnDHandlers(dropElem);
                }
                this.classList.remove("over");
                return false;
            }

            function handleDragEnd(e) {
                // this/e.target is the source node.
                this.classList.remove("over");
            }

            function addDnDHandlers(elem) {
                elem.addEventListener("dragstart", handleDragStart, false);
                elem.addEventListener("dragenter", handleDragEnter, false);
                elem.addEventListener("dragover", handleDragOver, false);
                elem.addEventListener("dragleave", handleDragLeave, false);
                elem.addEventListener("drop", handleDrop, false);
                elem.addEventListener("dragend", handleDragEnd, false);
            }

            var cols = document.querySelectorAll("#columns .column");
            [].forEach.call(cols, addDnDHandlers);
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
