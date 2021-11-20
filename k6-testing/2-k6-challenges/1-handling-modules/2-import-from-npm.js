// Challenge 1: You need to import 'LoginClientK6' and 'parseJwtK6' from 'ndc-2021-workshop-dummy-login'

// You can use webpack to bundle. https://k6.io/docs/using-k6/modules/#bundling-node-modules

// I have chosen another pragmatic solution, where i use the files imported into node_modules as "normal files" and refer to them explicitly.

// import {LoginClientK6, parseJwtK6} and try to do the rest..

import {check} from "k6"

const loginClient = new LoginClientK6("http://localhost:5135");

export const options = {
    iterations: 1,  // Number of iterations
    vus: 1,         // Number of virtual users to shard across
};

export default function () {
    const token = loginClient.login({username: "NDC_USER", password: "NDC_PASSWORD"});
    check(token, {
        "Token is set": t => t != null 
    })
    
    const parsed = parseJwtK6(token)
    check(parsed, {
        "Sub is set": p => p.payload.sub != null 
    })
}