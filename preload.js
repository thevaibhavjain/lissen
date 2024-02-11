const { fork } = require("child_process");

let ps;
ps = fork(`${__dirname}/backend/index.js`, [], {
    cwd: `${__dirname}/../`,
});
