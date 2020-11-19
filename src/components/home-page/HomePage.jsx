/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import React from 'react';

import logo from 'assets/logo-ensc.jpg';

import './HomePage.css';

document.addEventListener('DOMContentLoaded', (event) => {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    }());

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;
    const circles = [];

    canvas.width = W;
    canvas.height = H;
    let midPointX = W / 2;
    let midPointY = H / 2;
    let velocityX = 0;
    let velocityY = 0;
    const gravity = 0.01;

    // Random Circles creator
    function create() {
        recreate(this);
    }

    // Random Circles creator
    function recreate(circle) {
        // Place the circles at the center

        circle.x = midPointX;
        circle.y = midPointY;

        // Random radius between 2 and 6
        circle.radius = 2 + Math.random() * 3;

        // Random velocities
        circle.vx = 10 * (Math.random() - 0.5);
        circle.vy = 10 * (Math.random() - 0.5);

        // Random change-in-velocity
        circle.dx = (Math.random()) * (velocityX);
        circle.dy = (Math.random()) * (velocityY);

        // Random colors
        circle.r = Math.round(Math.random()) * 255;
        circle.g = Math.round(Math.random()) * 255;
        circle.b = Math.round(Math.random()) * 255;
        return circle;
    }

    for (let i = 0; i < 500; i++) {
        circles.push(new create());
    }

    function draw() {
        // Fill canvas with black color
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, W, H);

        // Fill the canvas with circles
        for (let j = 0; j < circles.length; j++) {
            const c = circles[j];
            if (c.radius > 0 && c.x <= W && c.x >= 0 && c.y <= H && c.y >= 0) {
                // Create the circles
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.5)`;
                ctx.fill();
                c.x += c.vx;
                c.y += c.vy;
                c.vx += c.dx;
                c.vy += c.dy;
                c.dy += gravity;
                c.radius -= 0.05;
            } else {
                recreate(c);
            }
        }
    }

    function animate() {
        draw();
        window.requestAnimFrame(animate);
    }

    canvas.onmousemove = function (e) {
        velocityX = Math.min(e.pageX - midPointX, 4) / 20;
        velocityY = Math.min(e.pageY - midPointY, 4) / 20;
        midPointX = e.pageX;
        midPointY = e.pageY;
    };

    animate();
});

const HomePage = () => (
    <div className="home-page">
        <canvas id="canvas" />
    </div>
);

export default HomePage;
