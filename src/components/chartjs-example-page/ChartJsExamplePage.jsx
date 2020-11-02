/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './ChartJsExamplePage.css';

const cue1 = {
    action: [{
        id: '1',
        startDate: '2020-01-02T15:16:42.427Z',
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
        computationTime: '2020-01-02T15:16:42.427Z',
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
        startDate: '2020-02-03T15:11:12.727Z',
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
        computationTime: '2020-02-03T15:11:12.727Z',
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
        startDate: '2020-03-05T15:21:34.122Z',
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
        computationTime: '2020-03-05T15:21:34.122Z',
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
        startDate: '2020-04-05T15:21:34.122Z',
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
        computationTime: '2020-04-05T15:21:34.122Z',
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
        startDate: '2020-05-05T15:21:34.122Z',
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
        computationTime: '2020-05-05T15:21:34.122Z',
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

const cue6 = {
    action: [{
        id: '6',
        startDate: '2020-01-05T15:21:34.122Z',
    }],
    description: 'desc6',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['6'],
    name: 'cue n°6',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-01-05T15:21:34.122Z',
        lat: 0,
        lon: 0,
        cueEventId: 'string',
    }],
    lat: 0,
    lon: 0,
    icon: 'string',
    subdomain: 'Economic',
    warningCriteriaDayRed: 'COM',
    warningCriteriaNightRed: 'COM',
    weighting: 6,
    emergenceOriginId: 'string',
};

const cue7 = {
    action: [{
        id: '7',
        startDate: '2020-06-05T15:21:34.122Z',
    }],
    description: 'desc7',
    iconType: 'string',
    id: 'string',
    isRepettitive: true,
    isSuperCue: true,
    triggerIds: ['7'],
    name: 'cue n°7',
    number: 0,
    occurences: [{
        minedDocumentId: 'string',
        miningState: true,
        sourceQuality: 0,
        computationTime: '2020-01-05T15:21:34.122Z',
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
    weighting: 6,
    emergenceOriginId: 'string',
};

const tabCues = [cue1, cue2, cue3, cue4, cue5, cue6, cue7];

const dateref1 = new Date(2020, 0, 1, 17, 23, 42);
const dateref2 = new Date(2020, 1, 23, 17, 23, 42);
const dateref3 = new Date(2020, 1, 24, 17, 23, 42);
const dateref4 = new Date(2020, 7, 23, 17, 23, 42);

const tabDates = [dateref1, dateref2, dateref3, dateref4];

// returns tabDom =
// [[domain 1, domain 2, domain 3, ...], [nb cues for domain 1 in 1st period, nb cues for domain 2 in 1st period, ...], [nb cues for dom 1 in 2nd period, ...]]
function getSubdomain(tableauDates) {
    const tabDom = [[], [], []];
    for (let i = 0; i < tabCues.length; i++) {
        const dom = tabCues[i].subdomain;
        const dateDom = new Date(tabCues[i].action[0].startDate);
        const posDom = tabDom[0].indexOf(dom);

        const dateInFirstPeriod = (dateDom > tableauDates[0]) && (dateDom < tableauDates[1]);
        const dateInSecondPeriod = (dateDom > tableauDates[2]) && (dateDom < tableauDates[3]);
        if (dateInFirstPeriod || dateInSecondPeriod) {
            if (posDom !== -1) {
                if (dateInFirstPeriod) {
                    tabDom[1][posDom] += 1;
                }
                if (dateInSecondPeriod) {
                    tabDom[2][posDom] += 1;
                }
            } else {
                tabDom[0].push(dom);
                if (dateInFirstPeriod) {
                    tabDom[1].push(1);
                } else {
                    tabDom[1].push(0);
                }
                if (dateInSecondPeriod) {
                    tabDom[2].push(1);
                } else {
                    tabDom[2].push(0);
                }
            // console.log(tabDom);
            }
        }
    }

    return tabDom;
}

const tabDomains = getSubdomain(tabDates);

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const myRadarChart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: tabDomains[0],
                datasets: [{
                    label: 'Période 1',
                    backgroundColor: 'rgba(255,0,0,0.6)',
                    data: tabDomains[1],
                },
                { label: 'Période 2',
                    backgroundColor: 'rgba(0,0,255,0.6)',
                    data: tabDomains[2] }],
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
                Spider graph (radar graph with Chart.js)
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
