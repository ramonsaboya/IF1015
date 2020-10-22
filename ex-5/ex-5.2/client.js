const https = require("http");
const process = require("process"); 

const options = {
    hostname: "localhost",
    port: 3000,
    path: process.argv[3],
    method: process.argv[2],
    headers: {
        'Accept': `application/${process.argv[4]}`,
    },
}

const req = https.request(options, res => {
    console.log(`status code: ${res.statusCode}`);

    res.on('data', data => {
        console.log(`body: ${data.toString()}`);
    })
});

req.on('error', console.log);

req.write(process.argv[5]);
req.end();
