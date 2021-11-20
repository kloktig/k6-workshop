// No challenge - Just a demo. This is the 3rd way of importing code from the outside. By referencing a public js-file
// In k6, however, every VU has a separate javascript virtual machine, duplicating the resource usage once each.
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
    iterations: 2,  // Number of iterations
    vus: 2,         // Number of virtual users to shard across
};

export default function () {
    console.log(randomItem([1,2,3]))
}