import userModel from "../../../db/models/user.model.js"
import bcrypt from "bcrypt"


//get users
// export const getUsers = async (req, res, next) => {
//     const users = await userModel.findAll() // select all ( [] )
//     res.status(200).json({ msg: "done", users })
// }


//add users- SIGNUP
export const signUp = async (req, res, next) => {
    
    const { username, email, password } = req.body
    // Check if the user already exists
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({username, email, password: hashedPassword})
    return res.status(201).json({ message: 'User registered successfully', user: newUser});
}



//LOGIN
export const login = async (req,res,next) =>{
    const { email, password } = req.body


    //check if user exists
    const user = await userModel.findOne({where: {email}})
    if(!user){
        return res.status(400).json({message: "invalid email or password, user doesnt exist"})
    }

    //verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid){
        return res.status(400).json({message: "invalid email or password, user doesnt exist"})
    }

    return res.status(200).json({message: "login successful!"})
}



//LOGOUT 

export const logout = async (req, res) => {
    const { email } = req.body
    // Check if the user exists
    const existingUser = await userModel.findOne({ where: { email } });
    if (!existingUser) {
        return res.status(400).json({ message: 'user doesnt exist' });
    }
    res.json({ message: 'Logged out successfully' });
    
};