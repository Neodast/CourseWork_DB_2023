class filterModel{
  constructor(json){
    this.filter = json;
    delete this.filter.sortBy;
  }
}

module.exports = filterModel;