import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './D3ExamplePage.css';

const D3ExamplePage = () => {
    const containerRef = useRef();

    useEffect(() => {
        const svgElement = d3.select(containerRef.current);
        svgElement.append('circle')
            .attr('cx', 150)
            .attr('cy', 70)
            .attr('r', 50);
    }, []);

    return (
        <div className="d3-example-page">
            <a
                href="https://www.d3-graph-gallery.com/spider"
                target="_blank"
                rel="noopener noreferrer"
            >
               Radar graph with d3
            </a>
            <svg ref={containerRef} />
        </div>
    );
};

export default D3ExamplePage;
