import { LoginClient, parseJwt } from '../node_modules/ndc-2021-workshop-dummy-login/index.js'; // <= Compare this with node

const loginClient = new LoginClient();

export const options = {
    iterations: 1,  // Number of iterations
    vus: 1,         // Number of virtual users to shard across
};

export default function () {
    const tokenResponse = loginClient.login({username: "NDC_USER", password: "NDC_PASSWORD"});
    console.log(tokenResponse.accessToken);
    console.log(parseJwt(tokenResponse.accessToken)); // <= Need to set flag
}