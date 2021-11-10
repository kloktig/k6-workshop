import { LoginClient } from './node_modules/ndc-2021-workshop-dummy-login/index.js';
import {check} from "k6"

const loginClient = new LoginClient();

export const options = {
    iterations: 100,
    vus: 10,
    userAgent: 'k6NDC2021/1.0',
    discardResponseBodies: true,
    ext: {
        loadimpact: {
            name: 'Hello k6 cloud!',
            projectID: 3558750,
            distribution: {
                distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 100 },
            },
            note: 'This is a test',
        },
    },
};

export default function () {
    const tokenResponse = loginClient.login({username: "NDC_USER", password: "NDC_PASSWORD"});
    check(
        tokenResponse,
        {
        'is OK': (response) => !response.accessToken,
        'anonther Check': (response) => !response
        },
    {
        tag: 'supertag'
    });
}