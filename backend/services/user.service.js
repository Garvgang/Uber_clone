// this will interact with mongodb

const userModel=require('../models/user.model');

const createUser=async ({fullname,email,password})=>{
    if (!fullname || !fullname.firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user=await userModel.create({
        fullname,
        email,
        password
    });
    return user;
};
module.exports={createUser};