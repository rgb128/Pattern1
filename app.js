'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

canvas.width = width;
canvas.style.width = width + 'px';
canvas.height = height;
canvas.style.height = height + 'px';

const config = {
    step: 50,
    strokeWidth: 25,
    shift: 0,
    lineRandomCoefficient: .25, // .5
    colors: ['red', 'blue', 'purple', 'black', 'yellow', 'green', 'orange'],
};

ctx.lineWidth = config.strokeWidth;
ctx.lineCap = 'round'; // ['butt', 'round', 'square']
ctx.fillStyle = 'white';
ctx.strokeStyle = 'blue';

function makeCross(x, y) {
    const size = config.step / 2;

    function lineTo(condition, x2, y2) {
        if (!condition) { return; }
        ctx.beginPath();
        ctx.strokeStyle = randomEntity(config.colors);
        // ctx.strokeStyle = `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`;
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // ctx.beginPath();
    lineTo(Math.random() < config.lineRandomCoefficient, x, y - size);
    lineTo(Math.random() < config.lineRandomCoefficient, x, y + size);
    lineTo(Math.random() < config.lineRandomCoefficient, x - size, y);
    lineTo(Math.random() < config.lineRandomCoefficient, x + size, y);
    // ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, config.step / 8, 0, 2 * Math.PI);
    ctx.fill();
}

for (let ri = config.shift; ri <= height; ri += config.step) {
    for (let ci = config.shift; ci <= width; ci += config.step) {
        makeCross(ci, ri);
    }
}

function map(num, frombottom, fromtop, tobottom, totop) {
    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomEntity(arr) {
    return arr[randomInt(arr.length)];
}