var util = require('util');
net = require('net');
var fs = require('fs');
var dgram = require('dgram');
var invitationSocket = dgram.createSocket('udp4');

var serverPort  = 48266;
var serverHost  = "0.0.0.0";
var chunkSize   = 1460;

var nodeAddress = process.argv[2];
var port        = process.argv[3];
var file        = process.argv[4];

function fileSize(filename) {
  var s = require("fs").statSync(filename);
  return s["size"];
}

console.log("Starting on %s:%d", serverHost, serverPort);
var server = net.createServer(function (socket) {
    process.stdout.write("Uploading");
    var fd = fs.openSync(file, 'r');
    var buffer = new Buffer(chunkSize);
    lastChunk = fs.readSync(fd, buffer, 0, chunkSize);
    socket.write(buffer);
    socket.on('data', function(data) {
        var dataString = data.toString();
        if (dataString === "OK") {
            console.log("\nResult: %s", dataString);
            fs.closeSync(fd);
            server.close();
            process.exit();
        }
        process.stdout.write(".");
        if (fs.readSync(fd, buffer, 0, chunkSize) > 0) {
            socket.write(buffer);
        } else {
            console.log("\nWaiting for result...");
        }
    });
})
server.listen(serverPort, serverHost);

var uploadSize = fileSize(file);
console.log("Upload size: %d", uploadSize);
var buf = new Buffer(util.format("%d %d %d\n", 0, serverPort, uploadSize));
console.log("Sending invitation to: %s", nodeAddress);
invitationSocket.send(buf, 0, buf.length, port, nodeAddress, function () {
    invitationSocket.close();
    console.log("Waiting for device...\n");
});




