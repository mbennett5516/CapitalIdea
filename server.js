const express = require('express');
const path = require('path');
const db = require('./models');
const app = express();
const Sequelize = require('sequelize');


Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
  };

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));    

const PORT = process.env.PORT || 8080;   

db.sequelize.sync().then(function() {
    app.listen(PORT, function(){
        console.log('App listening on port: ' + PORT);
    });
});