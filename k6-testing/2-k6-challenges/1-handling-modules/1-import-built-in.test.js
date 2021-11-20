/**

Refer to https://k6.io/docs/using-k6/modules/#using-local-modules-with-docker



In addition you should:
* Become more familiar with the order of execution in a k6-test.
* Inject env variable: Ref https://k6.io/docs/using-k6/environment-variables/
* Note that the recommended way is to use `k6 run test.js -e MY_ENV=Name` and not `MY_ENV=Name k6 run test.js` 



*/

// Challenge 1: Importing built-in functions. Import the built-in function 'sleep'. 
// https://k6.io/docs/javascript-api/
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
// https://k6.io/docs/using-k6/environment-variables/
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

// Challenge 3: Investigate the order of execution in k6
// https://k6.io/docs/using-k6/environment-variables/
