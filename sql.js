function Query(){
  this.callbacks    = [];
  this.keys         = [];
  this.table        = [];
  this.queryBuilder = [];
  this.result       = [];
  this.compare      = 0;
}

Query.prototype.select = function(){
    for (var i = 0; i < arguments.length; i++) {
      this.callbacks.push(arguments[i][0]);
      this.keys.push(arguments[i][1]);
    }
}

Query.prototype.from = function(table){
  this.table = table;
}

Query.prototype.get = function(){
  var result = [];
  if(!this.queryBuilder.length)
    this.queryBuilder = this.table;
  for (row in this.queryBuilder){
    var obj = {};
    for (var i = 0; i < this.callbacks.length; i++) {
      obj[this.keys[i]] = this.callbacks[i](this.queryBuilder[row]);
    }

    result.push(obj);
  }
  result.sort(this.compare);
  return result;
}

Query.prototype.where = function(callback){
  var aux = [];
  for(row in this.table){
    if(callback(this.table[row]) == true)
      aux.push(this.table[row]);
  }

  this.queryBuilder = aux;
  return this.queryBuilder;
}

Query.prototype.orderBy = function (key, order) {
  if(order== 'asc'){
      this.compare = function(a,b) {
      if (a[key] < b[key])
        return -1;
      else if (a[key] > b[key])
        return 1;
      else
        return 0;
    }
  }
  else{
    this.compare = function(a,b) {
      if (a[key] > b[key])
        return -1;
      else if (a[key] < b[key])
        return 1;
      else
        return 0;
    }
  }
};

Query.prototype.join = function (table2, col1, t2_col1) {
  var a = {};
  var b = [];
  for (row in this.table)
  {
    for(row2 in table2){
      if(this.table[row][col1] == table2[row2][t2_col1]){
        for (var attrname in this.table[row]) { a[attrname] = this.table[row][attrname];}
        for (var attrname in table2[row]) { a[attrname] = table2[row2][attrname]; }
        b.push(a);
        a = {};
      }
    }
  }
  this.queryBuilder = b;
};
