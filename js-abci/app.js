let createAbciServer = require('.');
let Connection = require('./src/connection.js');
let { mockStream, wait } = require('./test/common.js');
let fixtures = require('./test/fixtures.js');
let tm = require('tendermint-node');
let createTempDir = require('tempy').directory;
let getPort = require('get-port');

console.log('starting up');

function startNode(home, ports) {
  return tm.node(home, {
    p2p: { laddr: `tcp://127.0.0.1:${ports.p2p}` },
    rpc: { laddr: `tcp://127.0.0.1:${ports.rpc}` },
    proxy_app: `tcp://127.0.0.1:${ports.abci}`
  });
}

const createTendermintNode = async () => {
  let home = createTempDir();
  await tm.init(home);

  let ports = {
    p2p: await getPort(),
    rpc: await getPort(),
    abci: await getPort()
  };

  let node = startNode(home, ports);
  console.log('ports', ports);
  return { ports, node };
};

const setupAbciServer = async ports => {
  let info = {
    data: 'test app',
    version: '1.2.3'
  };
  let server = createAbciServer({
    info: () => info
  });
  server.listen(ports.abci);
};

async function setup() {
  let { ports, node } = await createTendermintNode();
  await setupAbciServer(ports);
  await node.started();
  let rpcResponse = await node.rpc.abciInfo();
  console.log('rpcResponse: ', rpcResponse)
//   t.deepEqual(rpcResponse, { response: info })
}

setup();

//   await Connection.loaded;

//   let server = createServer({
//     info(request) {
//       console.log('got info request', request);
//       return fixtures.infoResponse.info;
//     }
//     // implement any ABCI method handlers here
//   });

//   let stream = mockStream();
//   server.emit('connection', stream);

//   stream.emit('data', fixtures.infoRequest);
//   //   stream.emit('data', fixtures.infoRequestBytes);

//   await wait();

//   server.listen(26658);
