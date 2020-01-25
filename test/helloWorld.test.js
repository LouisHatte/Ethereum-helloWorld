const HelloWorld = artifacts.require('HelloWorld')

contract('HelloWorld', (accounts) => {
    let helloWorld

    before(async() => {
        helloWorld = await HelloWorld.deployed()
    })

    it('deploys successfully', async() => {
        const address = await helloWorld.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('initializes successfully', async() => {
        const message = await helloWorld.message()
        assert.equal(message, 'Hello world!')
    })
})
