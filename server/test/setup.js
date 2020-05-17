console.log('Chai assert set globally');
console.log('Sinon sandbox set globally');
console.log('Global test ENVs set');
let chai = require('chai');
let sinon = require('sinon').createSandbox();
global.assert = chai.assert;
global.sinon = sinon;
require('dotenv').config();

// Attempt to make requiring files from tests easier. Can be brittle when switching environments. For now I don't care.
// esssentially R means myroot
// https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
global.__MR = process.cwd();
global.__HOME = process.env.LOCAL_HOME
