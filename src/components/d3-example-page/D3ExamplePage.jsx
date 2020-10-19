import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './D3ExamplePage.css';
//import { string } from 'prop-types';

var cue1 = {
    action : [{
        id:"1",
        startDate: "2020-10-02T15:16:42.427Z",
        }],
    description: "desc1",
    iconType: "string",
    id:"string",
    isRepettitive : true,
    isSuperCue: true,
    triggerIds : ["1"],
    name: "cue n°1",
    number:0,
    occurences : [{
        minedDocumentId : "string",
        miningState: true,
        sourceQuality: 0,
        computationTime: "2020-10-02T15:16:42.427Z",
        lat:0,
        lon:0,
        cueEventId: "string"
    }],
    lat:0,
    lon:0,
    icon: "string",
    subdomain: "subdomain1",
    warningCriteriaDayRed : "COM",
    warningCriteriaNightRed : "COM",
    weighting: 5,
    emergenceOriginId:"string"
}

var cue2 = {
    action : [{
        id:"2",
        startDate: "2020-10-03T15:11:12.727Z",
        }],
    description: "desc2",
    iconType: "string",
    id:"string",
    isRepettitive : true,
    isSuperCue: true,
    triggerIds : ["2"],
    name: "cue n°2",
    number:0,
    occurences : [{
        minedDocumentId : "string",
        miningState: true,
        sourceQuality: 0,
        computationTime: "2020-10-03T15:11:12.727Z",
        lat:0,
        lon:0,
        cueEventId: "string"
    }],
    lat:0,
    lon:0,
    icon: "string",
    subdomain: "subdomain1",
    warningCriteriaDayRed : "COM",
    warningCriteriaNightRed : "COM",
    weighting: 5,
    emergenceOriginId:"string"
}
var cue3 = {
    action : [{
        id:"3",
        startDate: "2020-10-05T15:21:34.122Z",
        }],
    description: "desc3",
    iconType: "string",
    id:"string",
    isRepettitive : true,
    isSuperCue: true,
    triggerIds : ["3"],
    name: "cue n°3",
    number:0,
    occurences : [{
        minedDocumentId : "string",
        miningState: true,
        sourceQuality: 0,
        computationTime: "2020-10-05T15:21:34.122Z",
        lat:0,
        lon:0,
        cueEventId: "string"
    }],
    lat:0,
    lon:0,
    icon: "string",
    subdomain: "subdomain2",
    warningCriteriaDayRed : "COM",
    warningCriteriaNightRed : "COM",
    weighting: 5,
    emergenceOriginId:"string"
}
function setYValue() {
    console.log("test1 ");
    var tabSubdomains = ["subdomain1", "subdomain2", "subdomain3"];
    var tabY = [];
    for (let  i =0; i<tabCues.length; i++)
    {
        for (let  j =0; j<tabSubdomains.length; j++)
        {
            if (tabCues[i].subdomain === tabSubdomains[j])
            {
                tabY.push(j);
            }
        }
    }
    return tabY;
}

function setXYRValue() {
    console.log("test2 ");
    var tabY = setYValue();
    var tabCueXYR= [];
    var compteur = 0;
    var x, y, r;
    for (var oneCue in tabCues)
    {
        console.log("substring : " + oneCue.startDate.substring(8,9));
        console.log ("x =" + parseInt(oneCue.startDate.substring(8,9)));
        x=parseInt(oneCue.startDate.substring(8,9));

        r=oneCue.weighting;
        y=tabY[compteur];
        tabCueXYR.push({x, y, r});
        compteur++;
    }
    return tabCueXYR;
}



const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const tabCueXYR = setXYRValue();      
        // For a bubble chart
        const myBubbleChart = new Chart(canvasRef.current, {
            type: 'bubble',
            data: {
                labels: ['Domain1', 'Domain2', 'Domain3', 'Domain4'],
                datasets: [{
                    label: 'label1',
                    backgroundColor: 'rgba(255,0,0,0.6)',
                    data: tabCueXYR
                },
                {
                    label: 'label2',
                    backgroundColor: 'rgba(0,255,0,0.6)',
                    data: [{
                        x: 1, 
                        y: 1,
                        r: 4,
                    },
                    {
                        x: 1, 
                        y: 1,
                        r: 2,
                    }]
                },
            ],
            },
            options: Chart.defaults.bubble,
        });
    }, []);

    return (
        <div className="chartjs-example-page">
            <a
                href="https://www.chartjs.org/docs/latest/charts/bubble.html"
                target="_blank"
                rel="noopener noreferrer"
            >
                Sismographe graph with Chart.js
            </a>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ChartJsExamplePage;
