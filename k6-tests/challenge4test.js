import { sleep } from "k6";

export const options = {
    iterations: 3,
    vus: 2,
};
let counter = 0;

console.log(`${++counter} Init Code 1  -> VU:${__VU}`);

export function setup() {
    console.log(`${++counter} **Setup** VU: ${__VU}`);
    return { greeting: "Hello world!", counter: 0 }
}

export default function (setup) {
    console.log(`${++counter} VU code ---> ${setup.greeting} with setupCounter=${++setup.counter} VU:${__VU}, ITER: ${__ITER}`);

    sleep(0.1)
    return setup;
}

export function teardown(setup) {
    console.log(`${++counter} **Teardown** with setupCounter=${setup.counter} - VU: ${__VU}`);
}

console.log(`${++counter} Init Code 2* -> VU:${__VU}}`);
