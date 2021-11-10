import { sleep } from "k6";

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
            },
            note: 'This is a test',
        },
    },
};

export function setup() {
    console.log(`${__ENV.LI_LOAD_ZONE}-${__ENV.LI_INSTANCE_ID}-${__ENV.LI_INSTANCE_ID}`);
    if(!__ENV.LI_DISTRIBUTION) {
        console.log(`Local Run`);
    }
}

export default function () {
   sleep(0.1)
}

export function teardown() {
    console.log(`${__ENV.LI_LOAD_ZONE}-${__ENV.LI_INSTANCE_ID}-${__ENV.LI_DISTRIBUTION}`);
}