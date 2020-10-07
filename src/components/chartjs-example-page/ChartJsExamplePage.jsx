import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './ChartJsExamplePage.css';

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const myRadarChart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                datasets: [{
                    data: [20, 10, 4, 2],
                }],
            },
            options: {
                scale: {
                    angleLines: {
                        display: false,
                    },
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100,
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
        </div>
    );
};

export default ChartJsExamplePage;
