let tendermint = require('tendermint-node')

// init a directory for running tendermint
tendermint.initSync({ home: './tendermint' })

// start the full node
let node = tendermint.node({
  home: './tendermint',
  rpc: {
    laddr: 'tcp://0.0.0.0:8888'
  }
  // these options are equivalent to CLI flags
})
node.stdout.pipe(process.stdout)