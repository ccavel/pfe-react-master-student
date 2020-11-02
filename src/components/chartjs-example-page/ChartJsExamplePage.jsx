import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './ChartJsExamplePage.css';

const cue1 = {
    action: [{
        id: '1',
        startDate: '2020-10-02T15:16:42.427Z',
    }],
    description: 'desc1',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['1'],
    name: 'cue n°1',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-10-02T15:16:42.427Z',
        lat: 0,
        lon: 0,
        cueEventId: 'string',
    }],
    lat: 0,
    lon: 0,
    icon: 'string',
    subdomain: 'Maritime',
    warningCriteriaDayRed: 'COM',
    warningCriteriaNightRed: 'COM',
    weighting: 5,
    emergenceOriginId: 'string',
};

const cue2 = {
    action: [{
        id: '2',
        startDate: '2020-10-03T15:11:12.727Z',
    }],
    description: 'desc2',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['2'],
    name: 'cue n°2',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-10-03T15:11:12.727Z',
        lat: 0,
        lon: 0,
        cueEventId: 'string',
    }],
    lat: 0,
    lon: 0,
    icon: 'string',
    subdomain: 'Space',
    warningCriteriaDayRed: 'COM',
    warningCriteriaNightRed: 'COM',
    weighting: 5,
    emergenceOriginId: 'string',
};
const cue3 = {
    action: [{
        id: '3',
        startDate: '2020-10-05T15:21:34.122Z',
    }],
    description: 'desc3',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['3'],
    name: 'cue n°3',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-10-05T15:21:34.122Z',
        lat: 0,
        lon: 0,
        cueEventId: 'string',
    }],
    lat: 0,
    lon: 0,
    icon: 'string',
    subdomain: 'Space',
    warningCriteriaDayRed: 'COM',
    warningCriteriaNightRed: 'COM',
    weighting: 5,
    emergenceOriginId: 'string',
};

const cue4 = {
    action: [{
        id: '4',
        startDate: '2020-10-05T15:21:34.122Z',
    }],
    description: 'desc4',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['4'],
    name: 'cue n°4',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-10-05T15:21:34.122Z',
        lat: 0,
        lon: 0,
        cueEventId: 'string',
    }],
    lat: 0,
    lon: 0,
    icon: 'string',
    subdomain: 'Land',
    warningCriteriaDayRed: 'COM',
    warningCriteriaNightRed: 'COM',
    weighting: 5,
    emergenceOriginId: 'string',
};

const cue5 = {
    action: [{
        id: '5',
        startDate: '2020-10-05T15:21:34.122Z',
    }],
    description: 'desc5',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['5'],
    name: 'cue n°5',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-10-05T15:21:34.122Z',
        lat: 0,
        lon: 0,
        cueEventId: 'string',
    }],
    lat: 0,
    lon: 0,
    icon: 'string',
    subdomain: 'Political',
    warningCriteriaDayRed: 'COM',
    warningCriteriaNightRed: 'COM',
    weighting: 5,
    emergenceOriginId: 'string',
};

const tabCues = [cue1, cue2, cue3, cue4, cue5];

// returns tabDom : [[domain 1, domain 2, domain 3, ...], [nb cues for domain 1, nb cues for domain 2, ...]]
function getSubdomain() {
    const tabDom = [[], []];
    for (let i = 0; i < tabCues.length; i++) {
        const dom = tabCues[i].subdomain;
        const posDom = tabDom[0].indexOf(dom);
        if (posDom !== -1) {
            tabDom[posDom][1] += 1;
        } else {
            tabDom[0].push(dom);
            // console.log(tabDom[0]);
            tabDom[1].push(1);
            // console.log(tabDom[1]);
        }
    }

    return tabDom;
}

const tabDomains = getSubdomain();

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const myRadarChart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: tabDomains[0],
                datasets: [{
                    label: 'Toutes les cues, toutes périodes confondues (pas de séparation par dates)',
                    backgroundColor: 'rgba(255,0,0,0.6)',
                    data: tabDomains[1],
                }, /* {
                    label: 'Octobre',
                    backgroundColor: 'rgba(0,0,255,0.6)',
                    data: [523.05, 234.71, 0, 20.2, 32, 35.96, 0],
                }*/],
            },
            options: {
                scale: {
                    angleLines: {
                        display: false,
                    },
                    gridLines: {
                        color: 'white',
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 2,
                    },
                },
            },
        });
    }, []);

    return (
        <div className="chartjs-example-page">
            <a
                href="https://www.chartjs.org/docs/latest/charts/radar.html"
                target="_blank"
                rel="noopener noreferrer"
            >
                Radar graph with Chart.js
            </a>
            <canvas ref={canvasRef} />
            <label>
                {' '}
Début première période :
                <input type="date" />
            </label>
            <label>
                Fin première période :
                <input type="date" />
            </label>
            <label>
                {' '}
Début seconde période :
                <input type="date" />
            </label>
            <label>
                Fin seconde période :
                <input type="date" />
            </label>
            <input
                type="submit"
                id="update"
                value="Update"
            />
        </div>
    );
};

export default ChartJsExamplePage;
