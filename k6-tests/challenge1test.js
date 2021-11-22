// Run a simple test towards voting system

import http from "k6/http";

export default function () {
    let res = http.get('https://localhost:5135/');
    
} 