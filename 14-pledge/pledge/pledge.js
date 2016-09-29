'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:






/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class $Promise {
    // function $Promise() { }    
    constructor() {
        this.state = PENDING;
        this.handlerGroups = [];
        this.updateCbs = [];
    }
  
    // $Promise.prototype.then = function(s, e, u) { }
    then(success, error, update) {
        success = success instanceof Function ? success : null;
        error = error instanceof Function ? error : null;
        let group = {
            successCb: success,
            errorCb: error,
            forwarder: defer(),
        };
        this.handlerGroups.push(group);
        this.callHandlers();
        update instanceof Function && this.updateCbs.push(update);
        return group.forwarder.$promise;
    }

    catch(error) {
        return this.then(null, error);
    }

    callHandlers() {
        if (this.state == PENDING) return;
        let state = this.state;
        let value = this.value;        
        while (this.handlerGroups.length > 0) {
            let key = state == RESOLVED ? 'successCb' : 'errorCb';
            let forward = state == RESOLVED ? Deferral.prototype.resolve : Deferral.prototype.reject;
            
            let handler = this.handlerGroups.shift();
            let cb = handler[key];
            if (cb) {
                try {
                    let newValue = cb(this.value);
                    if (newValue instanceof $Promise) {
                        return newValue.then(handler.forwarder.resolve.bind(handler.forwarder),
                                             handler.forwarder.reject.bind(handler.forwarder));
                    }
                    if (typeof newValue !== 'undefined') {
                        handler.forwarder.resolve(newValue);
                    }
                } catch(err) {
                    handler.forwarder.reject(err);
                }
            } else {
                forward.call(handler.forwarder, this.value);
            }
        }
    }
}

class Deferral {
    constructor() {
        this.$promise = new $Promise();
    }

    resolve(data) {
        if (this.$promise.state != PENDING) return;
        this.$promise.value = data;
        this.$promise.state = RESOLVED;
        this.$promise.callHandlers();
    }

    reject(reason) {
        if (this.$promise.state != PENDING) return;
        this.$promise.value = reason;
        this.$promise.state = REJECTED;
        this.$promise.callHandlers();        
    }

    notify(data) {
        if (this.$promise.state != PENDING) return;
        for (let cb of this.$promise.updateCbs) {
            cb(data);
        }
    }
}

function defer() {
    return new Deferral();
}
