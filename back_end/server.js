const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;

// Middleware for parsing JSON data in the request body
app.use(bodyParser.json());

const port = new SerialPort("COM9", { baudRate: 9600 }); // Adjust port path
const parser = new Readline();
port.pipe(parser);

app.post("/bulb", (req, res) => {
  const action = req.body.action; // 'on' or 'off'
  port.write(action + "\n", (err) => {
    if (err) {
      res.status(500).send("Error sending command to Arduino");
    } else {
      res.send("Command sent successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
