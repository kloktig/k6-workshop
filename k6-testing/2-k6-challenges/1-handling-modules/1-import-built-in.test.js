// Challenge 1: You need to import built-in k6 function 'sleep'
// Ref: https://k6.io/docs/javascript-api/
import { sleep } from "k6"

export const options = {
    iterations: 40,
    vus: 2,
    userAgent: 'k6NDC2021/1.0',
};

console.log(`<*>: VU:${__VU} ENV['name']=${__ENV['name']}`);

export function setup() {
    console.log(`**Setup** VU: ${__VU} ENV['name']=${__ENV['name']}`);
    return "Hello"
}

// Challenge 2: Inject name in env Link til ENV
export default function (greeting) {
    // PS: Can also use __ENV["name"]
    const name = __ENV.name || "Default"
    console.log(`${greeting} ${name} VU:${__VU}, ITER: ${__ITER}`);

    sleep(0.2)
}

export function teardown() {
    console.log(`**Teardown** - VU: ${__VU} ENV['name']=${__ENV['name']}`);
}

console.log(`<<<>>>: VU:${__VU} ENV['name']=${__ENV['name']}`);
