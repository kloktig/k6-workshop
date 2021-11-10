import { LoginClient } from './node_modules/ndc-2021-workshop-dummy-login/index.js';
import {check, sleep} from "k6"

const loginClient = new LoginClient();

export const options = {
    iterations: 40,
    vus: 2,
    userAgent: 'k6NDC2021/1.0',
    discardResponseBodies: true,
    ext: {
        loadimpact: {
            name: 'Hello k6 cloud!',
            projectID: 3558750,
            distribution: {
                distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 100 },
                //distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
            },
            note: 'This is a test',
        },
    },
};

console.log(`<*>: VU:${__VU} ENV['name']=${__ENV['name']}`);

export function setup() {
    console.log(`${__ENV.LI_LOAD_ZONE}-${__ENV.LI_INSTANCE_ID}-${__ENV.LI_INSTANCE_ID}`);

    console.log(`**Setup** VU: ${__VU} ENV['name']=${__ENV['name']}`);
    return "Hello"
}

export default function (greeting) {
    console.log(`${__ENV.LI_LOAD_ZONE}-${__ENV.LI_INSTANCE_ID}-${__ENV.LI_INSTANCE_ID}`);

    console.log(`${greeting} ${__ENV.name} VU:${__VU}, ITER: ${__ITER}`);
    sleep(0.2)
}

export function teardown() {
    console.log(`${__ENV.LI_LOAD_ZONE}-${__ENV.LI_INSTANCE_ID}-${__ENV.LI_DISTRIBUTION}`);

    console.log(`**Teardown** - VU: ${__VU} ENV['name']=${__ENV['name']}`);
}

console.log(`<<<>>>: VU:${__VU} ENV['name']=${__ENV['name']}`);
