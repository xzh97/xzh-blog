import Vue from 'vue';

Vue.prototype.handleError = function(err) {
    let {header, data, status} = err;
    let {errCode = '', errMsg = ''} = data;
    this.$message(errMsg);
}
