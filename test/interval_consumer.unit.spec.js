const { expect } = require('chai');
const { consumeInterval } = require('../src/interval/interval_consumer');
const amqplib = require('amqplib');
const sinon = require('sinon');

describe('interval consumer', () => {

    it('should receive message', async () => {
        const assertQueue = sinon.stub();
        const bindQueue = sinon.stub();
        const message = { content: Buffer.from('buffer content') };
        const consume = sinon.stub().callsFake((q, callback) => callback(message));
        const ack = sinon.stub();
        const createChannel = sinon.stub().returns({
            assertQueue,
            bindQueue,
            consume,
            ack
        });
        sinon.stub(amqplib, 'connect').returns({
            createChannel,
        });
        const consoleLog = sinon.stub(console, 'log')
        await consumeInterval();

        expect(assertQueue.calledWith('interval')).to.be.true;
        expect(bindQueue.calledWith('interval', 'interval', 'interval-message')).to.be.true;
        expect(consume.calledWith('interval')).to.be.true;
        expect(ack.calledWith(message)).to.be.true;
        expect(consoleLog.calledWith('buffer content')).to.be.true;
    });

    after(() => {
        sinon.restore()
    })

});
