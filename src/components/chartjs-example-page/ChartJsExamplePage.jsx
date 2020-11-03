/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import data from './data';
import './ChartJsExamplePage.css';

const { tabCues } = data;

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
