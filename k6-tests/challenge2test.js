// Run a simple test towards voting system to make sure all is wired

import { check } from "k6";
import http from "k6/http";

export default function () {
    let res = http.get('http://localhost:5135/participants');

    // Challenge: Checks are wrong; fix them. 
    check(res, {
        "GET Participants Status OK": res => res.status === 201,
        "GET Participants Body OK": res => !res.json()    
    });
} 
