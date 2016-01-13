/**
 * Created by Victor Häggqvist on 1/12/16.
 */

import {LogLevel} from './LogLevel'

export class Log {

    //var instance = null;
    static init() {
        Log.level = LogLevel.DEBUG;
    }

    static silence() {
        Log.level = LogLevel.SILENT;
    }

    static l(msg) {
        Log.log(msg, 'log');
    }

    static w(msg) {
        Log.log(msg, 'warn');
    }

    static d(msg) {
        Log.log(msg, 'debug');
        //console.debug(Log.explode(msg));
    }

    static log(args, type='log') {
        let baked = Log.explode(args);

        if (Log.level === LogLevel.SILENT) return;

        switch (type) {
            case 'info': return console.info(baked);
            case 'log': return console.log(baked);
            case 'warn': return console.warn(baked);
            case 'debug': return console.debug(baked);
        }

    }

    static explode(args) {
        if (!Array.isArray(args)) {
            return args;
        }

        return args;
    }
}
