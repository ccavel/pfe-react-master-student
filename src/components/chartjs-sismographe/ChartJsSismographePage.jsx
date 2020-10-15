import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './ChartJsSismographe.css';

const ChartJsSismographe = () => {
    const canvasRef = useRef();

    useEffect(() => {
        // For a bubble chart
        const myBubbleChart = new Chart(ctx, {
            type: 'bubble',
            data: {
                labels: ['Domain1', 'Domain2', 'Domain3', 'Domain4'],
                datasets: [{
                    label: 'label1',
                    backgroundColor: 'rgba(255,0,0,0.6)',
                    data: [{
                        x: 1, 
                        y: 1,
                        r: 4,
                    },
                    {
                        x: 1, 
                        y: 1,
                        r: 4,
                    }]
                }, {
                    label: 'Octobre',
                    backgroundColor: 'rgba(0,0,255,0.6)',
                    data: [523.05, 234.71, 0, 20.2, 32, 35.96, 0],
                }],
            },
            options: options
        });
  
    }, []);

    return (
        <div className="chartjs-example-page">
            <a
                href="https://www.chartjs.org/docs/latest/charts/radar.html"
                target="_blank"
                rel="noopener noreferrer"
            >
                Sismographe graph with Chart.js
            </a>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ChartJsSismographe;