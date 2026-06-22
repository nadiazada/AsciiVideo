const densities = {
    detailed: '@#OSW%?|1!+=-:;._   ',
    classic: '@%#*+=-:. ',
    extended: '@B%8&WM*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\' ',
    minimalist: '@#*=-:. ',
    blocks: '█▓▒░  ',
    numbers: '8765432109'
};

let density = densities.detailed;
let asciiDiv;
let video;
function setup() {
    noCanvas();
    video = createCapture(VIDEO);
    video.size(120, 60);
    video.hide();
    asciiDiv = createDiv();
    asciiDiv.id('ascii-container');
    
    const presetSelect = document.getElementById('ascii-preset');
    presetSelect.addEventListener('change', (e) => {
        density = densities[e.target.value];
    });
}

function draw() {
    video.loadPixels();
    let asciiImage = '';
    for (let j = 0; j < video.height; j++) {
        for (let i = 0; i < video.width; i++) {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, 0, len));
            const c = density.charAt(charIndex);
            if (c == ' ') asciiImage += '&nbsp;';
            else asciiImage += c; 
            
        }
        asciiImage += '<br/>'; // line break after each row
    }
    asciiDiv.html(asciiImage);
}
