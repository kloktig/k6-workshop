// Run test together to see how the cloud solution works.

import { check } from "k6";
import http from "k6/http"

const header = {
    "Content-Type": "application/json"
}

const baseUrl = "http://localhost:5135";
const participants = ["Test1", "Test2"];
let token;

export const options = {
    executor: 'ramping-arrival-rate',
    startRate: 50,
    timeUnit: '1s',
    preAllocatedVUs: 500,
    maxVUs: 500,
    stages: [
        { target: 200, duration: '60s' },
        { target: 0, duration: '60s' },
    ],
    thresholds: {
        'http_req_duration{name:votes}': ['avg<2000'],
        'http_req_duration{name:pollCount}': ['avg<10000'],
    },
    ext: {
        loadimpact: {
          projectID: 3561729,
          name: "NDC Voting Test"
        }
      }
  };



export function setup() {
    const participants = ensureParticipantsAndGet();
    ensureActivePollActive(participants);

    return http.get(`${baseUrl}/poll`).json();
}

export default function(setupData) {
    if (__ITER == 0) {
        check(setupData, { "Poll Ready in VU context": (data) => data.id });
    }

    if (!token) {
        token = login(`${baseUrl}`);
    }
    check(token, { "Token OK": t => !!t });

    const voteUrl = `${baseUrl}/${setupData.id}`;
    const votePayload = JSON.stringify(getRandomVotes());
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        tags: {
            name: "votes"
        }
    };

    const vote = http.post(voteUrl, votePayload, params);

    check(vote, { "Vote OK": vote => vote.status === 202 });
}

export function teardown(setupData) {
    const closePollRes = http.get(`${baseUrl}/admin/poll/close/${setupData.id}`);
    check(closePollRes, {
        "Vote count status OK": res => res.status === 200,
    });

    const getPollCountRes = http.get(`${baseUrl}/admin/votes/voteCounts/${setupData.id}`);
    
    console.log(getPollCountRes.body);
    
    check(getPollCountRes, {
        "Vote count status OK": res => res.status === 200,
    });
}


function getRandomVotes() {
    return {
        "vote1": participants[getRandom(2)],
        "vote2": participants[getRandom(2)],
        "vote3": participants[getRandom(2)]
    };
}

function getRandom(max) {
    return Math.floor(Math.random() * max)
}

function login() {
    const url = `${baseUrl}/auth/token`;
    return http.post(url, JSON.stringify({ username: "NDC_USER", password: "NDC_PASSWORD" }), { headers: header }).body;
}

function ensureParticipantsAndGet() {
    let participants = http.get(`${baseUrl}/participants`).json()
    const participantArr = participants.map(p => p.name)

    if (!participantArr.includes("Test1"))
        http.post(`${baseUrl}/admin/participant`, JSON.stringify({ name: "Test1" }), { headers: header });

    if (!participantArr.includes("Test2"))
        http.post(`${baseUrl}/admin/participant`, JSON.stringify({ name: "Test2" }), { headers: header });

    participants = http.get(`${baseUrl}/participants`).json()

    check(participants, {
        "Participants OK": participants => {
            const participantArr = participants.map(p => p.name)
            return participantArr.includes("Test1") && participantArr.includes("Test2")
        }
    });
    return participants
}

function ensureActivePollActive(participants) {
    let currentPoll = http.get(`${baseUrl}/poll`).json();
    if (currentPoll.endTime) {
        check({}, { "poll Already OK": () => true });
        return currentPoll;
    }

    const participantsInPoll = JSON.stringify(participants.slice(0, 2));
    const poll = http.post(`${baseUrl}/admin/poll`, participantsInPoll, { headers: header, tags: { name: "pollCount" } });
    check(poll, { "pollAdded": poll => poll.status === 200 });
}