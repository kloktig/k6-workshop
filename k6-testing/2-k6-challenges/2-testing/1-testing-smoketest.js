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
    CounterErrors.add(response.status != 201)
}

function canLogin() {
    const res = http.post(`${baseUrl}/`, {
        "username": "NDC_USER",
        "password": "NDC_PASSWORD"
      })
}