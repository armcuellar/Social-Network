const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// User Schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'An email is required',
            unique: true,
            trim: true,
            lowercase:true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

// check email
const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;