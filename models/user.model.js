import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "User name is required"] ,
        trim: true,
        minLenght: 2, 
        maxLength: 50
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true,  
        lowerCase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String, 
        required: [true, "Password is required"],
        minLength: 6,
    },
}, {timestamps: true});


const User = mongoose.model('User', userSchema);



export default User;

//{user: "Deep", email: "deep@gmail.com", password: dehwbh}