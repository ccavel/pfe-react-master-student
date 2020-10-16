import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import './D3ExamplePage.css';

const ChartJsExamplePage = () => {
    const canvasRef = useRef();

    useEffect(() => {      
        // For a bubble chart
        const myBubbleChart = new Chart(canvasRef.current, {
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
                        r: 2,
                    }]
                }],
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
