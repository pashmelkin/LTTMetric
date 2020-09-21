import {Config} from "../models/iConfig";
const { Octokit } = require("@octokit/rest");

let config: Config = require('../config.json');

const octokit = new Octokit({
    auth: config.authtoken
});

export async function GetPullRequestsAsync(owner: string, repo: string, state: string) {
    return await octokit.pulls.list({
        owner: owner,
        repo: repo,
        state: state,
        per_page: 100
    })
}
