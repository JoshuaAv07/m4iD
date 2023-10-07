const url = `http://127.0.0.1:3000/arduino/create`;

const { ReadlineParser } = require('serialport');
const { SerialPort } = require('serialport');

const parsers = SerialPort.parsers;
const parser = new ReadlineParser ({
    delimiter: "\r\n",
});

var serialPort = new SerialPort ({
    path: "COM3",
    baudRate: 9600,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    flowControl: false,
})

serialPort.pipe(parser);

parser.on('data', async function (data) {
    let res = data.split(": ");
    res = res[1].split("cm");
    res = parseFloat(res[0]);
    console.log(res);

    if (res < 4) {
        const options = { 
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ 
                arduino: "test",
                team: "m4iD"
            }) 
        };
        const response = await fetch(url, options);
        console.log(response);
    }
})