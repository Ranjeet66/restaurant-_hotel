const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    mobile: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },

});

userSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (condidatePassword) {
    try {
        const isMatch = await bcrypt.compare(condidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;

