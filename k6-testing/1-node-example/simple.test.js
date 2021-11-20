import { LoginClient, parseJwt } from "ndc-2021-workshop-dummy-login";

const app = new LoginClient("http://localhost:5135")

const token = await app.login({username: "NDC_USER", password: "NDC_PASSWORD"});

if (!token)
    throw new Error("Token is not set")

const tokenContent = parseJwt(token)

console.log(tokenContent);

console.log("Yes! It works");
