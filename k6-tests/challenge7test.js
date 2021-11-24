
try {
    open("./node_modules/ndc-2021-workshop-dummy-login/indexk6.js")    
} catch (error) {
    console.error("Run 'npm ci' or task 'run npm ci'")
}
// This was only to make a better error message

import {LoginClientK6, parseJwtK6} from "./node_modules/ndc-2021-workshop-dummy-login/indexk6.js"
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