const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try {
        const user = await User.findOne({username:USERNAME});
        if(!user)
        return done(null,false,{message:'Incorrect username'});
      const isPassworMatch = await user.comparePassword(password);

      if(isPassworMatch){
        return done(null,user);
      }else{
        return done(null, false,{message:'Incorrect Password'});
      }

    } catch (err) {
        return done(err);
        
    }
}));

module.exports = passport;