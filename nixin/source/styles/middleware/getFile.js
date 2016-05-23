module.exports = function() {

    function getFile(style) {
        /**
         * use("getFile") into stylus file
         */
        style.define('getFile', function() {
            return this.currentBlock.filename;
        });
    }

    return getFile;

};
