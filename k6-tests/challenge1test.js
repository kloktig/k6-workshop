// Run a simple test towards voting system to make sure all is wired

import { check } from "k6";
import http from "k6/http";

export const options = {
    iterations: 100
}

export default function () {
    let res = http.get('http://localhost:5135/');
    check(res, {
        "OK - API is up and running!": res => res.status === 200
    });
} 
