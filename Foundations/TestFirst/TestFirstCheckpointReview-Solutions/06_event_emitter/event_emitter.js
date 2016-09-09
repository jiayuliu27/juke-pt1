function MyEventEmitter(){
  this.events = {};
}

MyEventEmitter.prototype.addListener = function(name, cb){
  if(this.events[name] === undefined){
    this.events[name] = [cb];  
  } else {
    this.events[name].push(cb);
  }

  
};


MyEventEmitter.prototype.emit = function(name) {
  var args = [].slice.call(arguments,1);
  this.events[name].forEach(function(index,i){
   index.apply(null, args[i]);
  });
};
