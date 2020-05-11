const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kxzpv.mongodb.net/${process.env.MONGO_DEV_DATABASE}?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`
const app = require('./app');

mongoose
.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(result => {
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
});