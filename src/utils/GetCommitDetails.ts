import {Config} from "../models/iConfig";
const { Octokit } = require("@octokit/rest");

let config: Config = require('../config.json');

const octokit = new Octokit({
    auth: config.GitToken
});

export async function GetCommitDetails (owner: string, repo: string, pull_number: number) {
    let res = await octokit.pulls.listCommits({
        owner: owner,
        repo: repo,
        pull_number: pull_number
    });
    console.log(res.status);
    return res.data;
};
