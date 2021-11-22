import http from "k6/http"
import {Counter} from "k6/metrics"

// How to make test not return 0 in order to fail it in CI
// Execute 'echo $?' in console after running test to the latests status code 
const baseUrl = "http://localhost:5135"
const CounterErrors = new Counter('Errors');

export const options = {
    iterations: 1,
    vus: 1,
    thresholds: {
        'Errors': ['count<1'],
    }
}
export default function() {
    const response = http.get(`${baseUrl}/participants`)
    
    // Challenge 1: Make this fail in a way that give exit code different from 0. On POSIX systems the standard exit code is 0 for success and any number from 1 to 255 for anything else.
    // https://k6.io/docs/javascript-api/k6-metrics/counter/

}
