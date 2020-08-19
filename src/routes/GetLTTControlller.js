"use strict";
exports.__esModule = true;
var GetPullRequestNumber_1 = require("../middleware/GetPullRequestNumber");
var Octokit = require("@octokit/rest").Octokit;
var DateDiff = require('date-diff');
var PullRequest_1 = require("../models/PullRequest");
var Commit_1 = require("../models/Commit");
var octokit = new Octokit();
var myArgs = process.argv.slice(2);
var branch = myArgs[0];
if (branch === undefined) {
    console.error("No branch parameter specified");
    process.exit(400);
}
console.log('getting the stats for ', branch);
var myPulls;
var myCommits;
var pr = GetPullRequestNumber_1.GetPullRequestNumber("pashmelkin", "vegetableApp", branch);
console.log(pr);
octokit.pulls.list({
    owner: "pashmelkin",
    repo: "vegetableApp",
    state: "closed"
})
    .then(function (_a) {
    var data = _a.data;
    data.forEach(function (element) {
        if (element.base.ref === "master" && element.head.ref === branch) {
            myPulls.push(new PullRequest_1.PullRequest(element.number, element.head.ref));
        }
    });
    if (myPulls.length > 1) {
        console.log("more then PR is found: ", myPulls.length);
        myPulls.forEach(function (pr) {
            console.log(pr);
        });
    }
    else {
        console.log(myPulls[0].id);
        octokit.pulls.listCommits({
            owner: "pashmelkin",
            repo: "vegetableApp",
            pull_number: myPulls[0].id
        })
            .then(function (_a) {
            var data = _a.data;
            data.forEach(function (element) {
                myCommits.push(new Commit_1.Commit(element.sha, element.commit.committer.date));
            });
            var len = myCommits.length;
            var date1 = new Date(myCommits[0].date);
            var date2 = new Date(myCommits[len - 1].date);
            console.log(date1, date2);
            var diff = new DateDiff(date1, date2);
            console.log(Math.abs(diff.days()), " days ");
        });
    }
});
