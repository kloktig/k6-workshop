import { LoginClient, parseJwt } from "ndc-2021-workshop-dummy-login";

const app = new LoginClient()

const tokenResponse = app.login({username: "NDC_USER", password: "NDC_PASSWORD"});

if (!tokenResponse.accessToken)
    throw new Error("Token is not set")

const tokenContent = parseJwt(tokenResponse.accessToken)

console.log(tokenContent);

console.log("Yes! It works");