// Run a simple test towards voting system to make sure all is wired

import { check } from "k6";
import http from "k6/http";

export default function () {
    let response = http.get('http://localhost:5135/participants');

    // Challenge: Checks are wrong; fix them. 
    check(response, {
        "GET Participants Status OK": res => res.status === 201,
        "GET Participants Body OK": whatever => !whatever.json()    
    });
} 
