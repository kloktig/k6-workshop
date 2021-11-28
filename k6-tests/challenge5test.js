import { check } from "k6"

export const options = {
    iterations: 1,
    vus: 1,
}

// Challenge: Inject your name via the env variable 'name'
export default function() {
    const yourName = __ENV.name;

    check(__ENV.name, {
        "Name is set OK": (name) => !!name
    });
    
    if(!yourName)
        console.log(`ENV variable 'name' is not set`);
    else
        console.log(`Hello ${yourName}!`);

}
