module.exports = function() {

    return function(style) {
        /**
         * use("getFile") into stylus file
         */
        style.define('getFileName', function() {
            return this.currentBlock.filename;
        });
    };

};
