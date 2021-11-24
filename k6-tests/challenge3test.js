import { check } from "k6";
import http from "k6/http"
import {Counter} from "k6/metrics"

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
    const response = http.get(`${baseUrl}/shouldGive405`)
    
    check(response, {
        "This check fails, but does not cause return code different from 0": res => res.status == 200,
        "HTTP return code is 405": res => res.status == 405
    })

    // Challenge: make the process return something else than 0 

}
