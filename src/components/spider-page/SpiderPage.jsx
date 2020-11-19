/* eslint-disable max-lines-per-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js';

import { getSubdomains, getNbCuesBySubDomainForDateRange } from 'utils/multidomain';

import data from './spider.data';
import './SpiderPage.css';

const { tabCues } = data;

const LABEL_DATE_RANGE_1 = 'Date Range 1';
const LABEL_DATE_RANGE_2 = 'Date Range 2';
const COLOR_DATE_RANGE_1 = 'rgb(54, 162, 235)';
const COLOR_DATE_RANGE_1_ALPHA = 'rgba(54, 162, 235, 0.3)';
const COLOR_DATE_RANGE_2 = 'rgb(255, 99, 132)';
const COLOR_DATE_RANGE_2_ALPHA = 'rgba(255, 99, 132, 0.3)';
const MIN_SCALE_SIZE = 5;
const GRAPH_FONT_SIZE = 16;

const SpiderPage = () => {
    // REF: reference to the canvas element, where the chart is rendered
    const canvasRef = useRef();

    // STATE
    const [date1, setDate1] = useState();
    const [date2, setDate2] = useState();
    const [date3, setDate3] = useState();
    const [date4, setDate4] = useState();

    // EVENT HANDLERS
    const handleDate1Change = useCallback((event) => {
        setDate1(event.target.value);
    }, []);
    const handleDate2Change = useCallback((event) => {
        setDate2(event.target.value);
    }, []);
    const handleDate3Change = useCallback((event) => {
        setDate3(event.target.value);
    }, []);
    const handleDate4Change = useCallback((event) => {
        setDate4(event.target.value);
    }, []);

    // EFFECT SYNCHRONIZATION: Chart will be re-rendered everytime one of the date changes
    useEffect(() => {
        const subDomains = getSubdomains(tabCues);
        const nbCuesBySubDomainForDateRange1 = getNbCuesBySubDomainForDateRange(date1, date2, subDomains, tabCues);
        const nbCuesBySubDomainForDateRange2 = getNbCuesBySubDomainForDateRange(date3, date4, subDomains, tabCues);
        const max = Math.max(...nbCuesBySubDomainForDateRange1, ...nbCuesBySubDomainForDateRange2);
        // eslint-disable-next-line no-new
        new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: subDomains,
                datasets: [
                    {
                        label: LABEL_DATE_RANGE_1,
                        data: nbCuesBySubDomainForDateRange1,
                        backgroundColor: COLOR_DATE_RANGE_1_ALPHA,
                        borderColor: COLOR_DATE_RANGE_1,
                        pointBackgroundColor: COLOR_DATE_RANGE_1,
                    },
                    {
                        label: LABEL_DATE_RANGE_2,
                        data: nbCuesBySubDomainForDateRange2,
                        backgroundColor: COLOR_DATE_RANGE_2_ALPHA,
                        borderColor: COLOR_DATE_RANGE_2,
                        pointBackgroundColor: COLOR_DATE_RANGE_2,
                    },
                ],
            },
            options: {
                scale: {
                    angleLines: {
                        display: false,
                        fontSize: 40,
                    },
                    gridLines: {
                        color: 'white',
                    },
                    ticks: {
                        beginAtZero: true,
                        max: max > MIN_SCALE_SIZE ? max : MIN_SCALE_SIZE,
                        stepSize: 1,
                    },
                    pointLabels: {
                        fontSize: GRAPH_FONT_SIZE,
                    },
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontSize: GRAPH_FONT_SIZE,
                    },
                },
            },
        });
    }, [date1, date2, date3, date4]);

    return (
        <div className="spider-page">
            <h2>Spider graph</h2>
            <div className="container">
                <div className="date-form">
                    <label>
                        {LABEL_DATE_RANGE_1}
                        <input
                            type="date"
                            value={date1}
                            onChange={handleDate1Change}
                            className="inputDate"
                        />
                        <input
                            type="date"
                            value={date2}
                            onChange={handleDate2Change}
                            className="inputDate"
                        />
                    </label>
                    <label>
                        {LABEL_DATE_RANGE_2}
                        <input
                            type="date"
                            value={date3}
                            onChange={handleDate3Change}
                            className="inputDate"
                        />
                        <input
                            type="date"
                            value={date4}
                            onChange={handleDate4Change}
                            className="inputDate"
                        />
                    </label>
                </div>
                <div className="chart-container">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
};

export default SpiderPage;
