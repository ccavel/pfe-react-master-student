/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

import { getSubdomain } from './spider.helpers';
import data from './spider.data';
import './SpiderPage.css';

const dateref1 = new Date(2020, 0, 1, 17, 23, 42);
const dateref2 = new Date(2020, 0, 1, 17, 23, 42);
const dateref3 = new Date(2020, 0, 1, 17, 23, 42);
const dateref4 = new Date(2020, 0, 1, 17, 23, 42);
const tabDates = [dateref1, dateref2, dateref3, dateref4];

const { tabCues } = data;

const SpiderPage = () => {
    // eslint-disable-next-line prefer-const
    let [tabDomains, setDom] = useState({});
    tabDomains = getSubdomain(tabCues, tabDates);
    const canvasRef = useRef();
    const state = { date1: '', date2: '', date3: '', date4: '' };

    const handleInputChange = (event) => {
        event.preventDefault();
        setDom({ tabDomains: getSubdomain(tabCues, tabDates) });
    };

    const mySubmitHandler = (event) => {
        event.preventDefault();
        const upDate = new Date(event.target.value);
        tabDates[event.target.id] = upDate;
    };

    useEffect(() => {
        // eslint-disable-next-line no-new
        new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: tabDomains[0],
                datasets: [{ label: 'Période 1', backgroundColor: 'rgba(255,0,0,0.6)', data: tabDomains[1] },
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
    }, [tabDomains]);

    return (
        <div className="spider-page">
                Spider graph (radar graph with Chart.js)
            <canvas ref={canvasRef} />

            <form onSubmit={handleInputChange}>
                <div className="row">
                    <div className="column">
                        <div className="row">
                            <label>
          Date début période 1 :
                                {' '}
                                {state.date1}
                                <input
                                    type="date"
                                    id="0"
                                    onChange={mySubmitHandler}
                                />
                                {' '}

                            </label>
                        </div>
                        <div className="row">
                            <label>
          Date fin période 1 :
                                {' '}
                                {state.date2}
                                <input
                                    type="date"
                                    id="1"
                                    onChange={mySubmitHandler}
                                    placeholder="dd-mm-yyyy"
                                />
                                {' '}
                            </label>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row">
                            <label>
          Date début période 2 :
                                {' '}
                                {state.date3}
                                <input
                                    type="date"
                                    id="2"
                                    onChange={mySubmitHandler}
                                />
                                {' '}
                            </label>
                        </div>
                        <div className="row">
                            <label>
          Date fin période 2 :
                                {' '}
                                {state.date4}
                                <input
                                    type="date"
                                    id="3"
                                    onChange={mySubmitHandler}
                                />
                                {' '}
                            </label>
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            onSubmit={handleInputChange}
                        />
                    </div>

                </div>
            </form>

        </div>
    );
};

export default SpiderPage;
