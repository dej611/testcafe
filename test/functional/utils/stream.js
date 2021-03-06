const { Writable: WritableStream } = require('stream');


const ASYNC_REPORTER_FINALIZING_TIMEOUT = 2000;

module.exports.createTestStream = () => {
    return {
        data: '',

        writable: true,

        pipe: () => {},

        _write (val) {
            this.data += val;
        },

        _writableState: {},

        write (val) {
            this._write(val);
        },
        end (val) {
            if (val === void 0)
                return;

            this._write(val);
        }
    };
};


module.exports.createAsyncTestStream = ({ shouldFail } = {}) => {
    return new WritableStream({
        write (chunk, enc, cb) {
            cb();
        },

        final (cb) {
            setTimeout(() => {
                this.finalCalled = true;

                cb(shouldFail ? new Error('Stream failed') : null);
            }, ASYNC_REPORTER_FINALIZING_TIMEOUT);
        }
    });
};

module.exports.createNullStream = () => {
    return {
        write: () => {},
        end:   () => {}
    };
};
