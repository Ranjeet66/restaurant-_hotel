const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({

    image: {
        type:[String],
      },

      title:{
        type:String,
        require:true
      },
      bodys:{
        type:String,
        require:true
      },
     
      
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }

    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },

},{ timestamps: true }
);


const Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;
