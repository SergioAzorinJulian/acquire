'use strict'

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AcquireSchema=new Schema({
    
      time_start: {type:String},
      time_end: {type:String},
      target_date:{type:String},
      consumos:{type:[Number]}
    
})

module.exports=mongoose.model('Datos',AcquireSchema)