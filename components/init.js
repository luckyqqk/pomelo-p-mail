var PlayerMail = require('player-mail');
module.exports = function(app, opts) {
    var ppm = new PomeloPlayerMail(app, opts);
    app.set('p-mail', ppm.mailServer, true);
    return ppm;
};

var PomeloPlayerMail = function(app, opts) {
    this.app = app;
    this.opts = opts;
    this.mailServer = new PlayerMail(app.get('mysql'));
};

PomeloPlayerMail.prototype.start = function(cb) {
    var self = this;
    //if (!!self.opts) {
    //    self.mailServer.start(self.opts, cb);
    //    return;
    //}
    var dataMgr = self.app.get('dataMgr');
    dataMgr.structureRedis.getStructure(dataMgr.databaseSign, 'p_mail', (err, structure)=> {
        if (!!err || !structure) {
            cb(err || 'playerMail can not find p_mail table structure');
            return null;
        }
        self.mailServer.start(structure, cb);
    });
};
