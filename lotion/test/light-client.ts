let { connect } = require('../src/index')

async function main() {
  debugger;
  let { state, send } = await connect(process.env.GCI)

  console.log(await send({ foo: 'bar', shouldError: false }))

  console.log(await state)
}

main()
