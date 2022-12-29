const fibonacci = require('./fibonacci');
const sinon = require('sinon');
const assert = require('assert');

;(async () => {
   
    {
        const fib = new fibonacci();
        const spy = sinon.spy(fib, fib.execute.name);
        for await (const _ of fib.execute(3)) {}
        const expectedCount = 4;
        assert.deepStrictEqual(spy.callCount, expectedCount);
    }
    {
        const fib = new fibonacci();
        const spy = sinon.spy(fib, fib.execute.name);
        const [...result] = fib.execute(5);

        const {args} = spy.getCall(2);
        const expectedArgs = [0,1,1,2,3];
        const expectedParams = Object.values({
            input:3,
            current:1,
            next:2
        })

        assert.deepStrictEqual(args, expectedParams);
        assert.deepStrictEqual(result, expectedArgs);
    }
})();