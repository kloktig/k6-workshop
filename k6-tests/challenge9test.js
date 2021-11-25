// Run test together to see how the cloud solution works.

import { check } from "k6";
import http from "k6/http"

const header = {
    "Content-Type": "application/json",
    "accept": "*/*"
}

const baseUrl = "http://localhost:5135";
let token;

export const options = {
    vus: 100,
    iterations: 300
};

export function setup() {
    const participants = ensureParticipantsAndGet();
    ensureActivePollActive(participants)

    return http.get(`${baseUrl}/poll`).json();;
}

const participants = ["Test1", "Test2"];

export default function (setupData) {
    if (__ITER == 0) {
        check(setupData, { "Poll Ready in VU context": (data) => data.id })
    }

    if (!token) {
        token = login(`${baseUrl}`)
        check(token, { "Token OK": t => !!t });
        header["Authorization"] = `Bearer ${token}`;
    }

    const votes = {
        "vote1": participants[getRandom(2)],
        "vote2": participants[getRandom(2)],
        "vote3": participants[getRandom(2)]
    };

    http.post(`${baseUrl}/${setupData.id}`, JSON.stringify(votes), header)
}


function getRandom(max) {
    return Math.floor(Math.random() * max)
}

function login() {
    const header = {
        "Content-Type": "application/json",
        "accept": "*/*"
    }
    const url = `${baseUrl}/auth/token`;
    return http.post(url, JSON.stringify({ username: "NDC_USER", password: "NDC_PASSWORD" }), { headers: header }).body;
}

function ensureParticipantsAndGet() {
    let participants = http.get(`${baseUrl}/participants`)
    if (participants.length < 2) {
        http.post(`${baseUrl}/admin/participant`, JSON.stringify({ name: "Test1" }), { headers: header });
        http.post(`${baseUrl}/admin/participant`, JSON.stringify({ name: "Test2" }), { headers: header });
        participants = http.get(`${baseUrl}/participants`)
    }

    check(participants, { "Participants OK": participants => participants.json().length > 1 });
    return participants.json()
}

function ensureActivePollActive(participants) {
    let currentPoll = http.get(`${baseUrl}/poll`).json();
    if (!currentPoll.endTime) {
        check({}, { "poll Already OK": () => true });
        return currentPoll;
    }
    console.log(JSON.stringify(currentPoll))

    const participantsInPoll = JSON.stringify(participants.slice(0, 2));
    const poll = http.post(`${baseUrl}/admin/poll`, participantsInPoll, { headers: header });
    check(poll, { "pollAdded": poll => poll.status === 200 });
}