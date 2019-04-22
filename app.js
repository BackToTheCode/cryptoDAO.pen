let lotion = require('lotion');


let app = lotion({
  initialState: {
    count: 0
  },
  logTendermint: false,     
})

app.use(function(state, tx) {
  if (state.count === tx.nonce) {
    state.count++
  }
})

app.start().then(appInfo => console.log(appInfo.GCI))