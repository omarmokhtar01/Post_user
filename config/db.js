const mongoose = require('mongoose')

const db=()=>{
 mongoose.connect('mongodb://127.0.0.1:27017/graphql').then((conn)=>{
    console.log(`Database is connect ${conn.connection.host}`);
 })
}
module.exports = db