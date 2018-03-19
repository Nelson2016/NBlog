import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    password: String,
    random: String,
    mail: String,
    jurisdiction: {
        comment: Boolean,
        admin: Boolean
    },
    createAt: Number,
    updateAt: Number,
    token: String
});

UserSchema.pre('save', async function (next) {
    if (!this.created) {
        this.createAt = Date.now();
    }
    this.updateAt = Date.now();
    await next();
});

const User = mongoose.model('User', UserSchema);

export default User;