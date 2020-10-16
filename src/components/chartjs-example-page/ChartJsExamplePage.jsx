import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './ChartJsExamplePage.css';

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const myRadarChart = new Chart(canvasRef.current, {
            type: 'radar',
            data: {
                labels: ['Logement', 'Alimentaire', 'Études', 'Loisirs', 'Transports', 'Abonnements', 'Autres'],
                datasets: [{
                    label: 'Septembre',
                    backgroundColor: 'rgba(255,0,0,0.6)',
                    data: [523.05, 383.07, 692, 28.43, 26.02, 35.96, 71],
                }, {
                    label: 'Octobre',
                    backgroundColor: 'rgba(0,0,255,0.6)',
                    data: [523.05, 234.71, 0, 20.2, 32, 35.96, 0],
                }],
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

