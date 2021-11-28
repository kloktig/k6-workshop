import {LoginClientK6, parseJwtK6} from "./node_modules/ndc-2021-workshop-dummy-login/indexk6.js"
import {check} from "k6"

const loginClient = new LoginClientK6("http://localhost:5135");

export const options = {
    iterations: 1,  // Number of iterations
    vus: 1,         // Number of virtual users to shard across
};

// Demo: This is to show one possible solution for sharing code.
// The 'ndc-2021-workshop-dummy-login' package is imported into 'node_modules' using npm

//PS: Remember to run 'npm ci'
export default function () {
    const token = loginClient.login({username: "NDC_USER", password: "NDC_PASSWORD"});
    check(token, {
        "Token is set": t => t != null 
    });
    
    const parsed = parseJwtK6(token)
    check(parsed, {
        "Sub is set": p => p.payload.sub != null 
    });

    console.log(JSON.stringify(parsed, null, 2));
}