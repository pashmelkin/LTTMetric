const { Octokit } = require("@octokit/rest");
const  DateDiff = require('date-diff');
const octokit = new Octokit();

var myArgs = process.argv.slice(2);

const branch = myArgs[0];
console.log('getting the stats for ', branch);

var myPulls = [];
var PullRequest = function (id, branch) {
    this.id = id;
    this.branch = branch;
};

var Commit = function (sha, date) {
    this.sha = sha;
    this.date = date;
};
var myCommits = [];

octokit.pulls.list({
    owner: "pashmelkin",
    repo: "vegetableApp",
    state: "closed",
})
    .then(({ data }) => {
        data.forEach(element => {
            if (element.base.ref === "master" && element.head.ref === branch) {
                myPulls.push(new PullRequest(element.number, element.head.ref));
            }

        });
        if(myPulls.length > 1) {
            console.log("more then PR is found: ", myPulls.length );
            myPulls.forEach(pr => {
                console.log(pr);
            });
        }
        else{
            console.log(myPulls[0].id);
            octokit.pulls.listCommits({
                owner: "pashmelkin",
                repo: "vegetableApp",
                pull_number: myPulls[0].id,
            })
                .then( ({ data }) => {
                    data.forEach(element => {
                        myCommits.push(new Commit(element.sha, element.commit.committer.date));
                    });
                    const len = myCommits.length;
                    const date1 = new Date(myCommits[0].date);

                    const date2 = new Date(myCommits[len-1].date);
                    console.log(date1, date2);
                    var diff = new DateDiff(date1, date2);
                    console.log(Math.abs(diff.days()), " days " );
                })
        }
    });
