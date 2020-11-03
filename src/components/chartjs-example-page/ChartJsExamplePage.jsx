/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import { getSubdomain } from './spider.helpers';
import './ChartJsExamplePage.css';
import data from './spider.data';

const dateref1 = new Date(2020, 0, 1, 17, 23, 42);
const dateref2 = new Date(2020, 1, 23, 17, 23, 42);
const dateref3 = new Date(2020, 1, 24, 17, 23, 42);
const dateref4 = new Date(2020, 7, 23, 17, 23, 42);
const tabDates = [dateref1, dateref2, dateref3, dateref4];

const { tabCues } = data;
const tabDomains = getSubdomain(tabCues, tabDates);

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        // eslint-disable-next-line no-new
        new Chart(canvasRef.current, {
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
