const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

export async function GetPullRequestsAsync(owner: string, repo: string, state: string) {
    return await octokit.pulls.list({
        owner: owner,
        repo: repo,
        state: state
    })
};
