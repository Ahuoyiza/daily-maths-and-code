const readline = require('readline');
const { clearScreenDown, cursorTo } = require('readline');
//

const r = 10;
const step = Math.PI / 20;
const delay = 100;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function drawSphere() {
    let theta = 0;
    let phi = 0;

    function drawFrame() {
        clearScreenDown(process.stdout);
        cursorTo(process.stdout, 0, 0);

        for (theta = 0; theta <= Math.PI; theta += step) {
            let rc = r * Math.sin(theta);
            let zc = r * Math.cos(theta);

            for (phi = 0; phi < 2 * Math.PI; phi += step) {
                let xc = rc * Math.cos(phi);
                let yc = rc * Math.sin(phi);

                let x = Math.round(xc + 40);
                let y = Math.round(yc + 12);

                cursorTo(process.stdout, x, y);
                process.stdout.write('*');
            }
        }
    }

    setInterval(drawFrame, delay);
}

drawSphere();