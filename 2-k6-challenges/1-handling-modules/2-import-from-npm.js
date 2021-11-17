// TODO: You need to import 'LoginClientK6' and 'parseJwtK6' from 'ndc-2021-workshop-dummy-login'

const loginClient = new LoginClientK6("https://localhost:7240");

export const options = {
    iterations: 1,  // Number of iterations
    vus: 1,         // Number of virtual users to shard across
};

export default function () {
    const token = loginClient.login({username: "NDC_USER", password: "NDC_PASSWORD"});
    console.log(`${JSON.stringify(parseJwtK6(token), null, 2)}\n`);
}