const userModel= require("../models/userModel")

const postModel= require("../models/postModel")

const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

// User Querys
const userQuerys ={
    usersGet: async() => {
        const getUsers = await userModel.find();
        return getUsers
    },
    usersGetById: (args) =>{
        return users.find(user => user.id === args.id)
},
hello:()=>"Hello world",
userGetOne: async({id})=>{
    const user = await userModel.findById(id).populate('posts')
    console.log(user);
    return user
}
}

// User Mutation
const userMutations={
    // to create new user
    // regis from schema
        /*
    mutation creatingUser{
  usersCreate(regis:{id:"3",name:"asd",email:"oamr",phone:"0155999999",password:"155651"}) {
    id name email phone password
  }
}
     */
    usersCreate: async({regis})=>{
        const {name,email,phone,password}= regis;
        const createUser = await userModel.create({name,email,phone,password})
        return{
            id:createUser.id,
            name:createUser.name,
            email:createUser.email,
            phone:createUser.phone,
            password:createUser.password
        }
    },


    /*
    mutation login{
  
  token:userLogin(input:{email:"oamr",password:"155651"})
}

    */
    userLogin: async({input})=>{
        const {email,password}= input;
        const user = await userModel.findOne({email});
        const validPassword=await bcrypt.compare(password,user.password)
        if(!user||!validPassword){
            throw new Error("invalid password")
        }
        let token =jwt.sign({userID:user.id},process.env.SECRET,{expiresIn:'3h'})
        return token
    }
}

const postMutations={
    postCreate:async({content,title,token})=>{
        let payload = jwt.verify(token,process.env.SECRET)
        let user = await userModel.findById(payload.userID)
        const post = await postModel.create({content,title,userId:user._id})
        return "post Created"
    },

    postUpdate:async({id,title,content})=>{
        const post=await postModel.findByIdAndUpdate(id,{title,content})
        console.log(post);
        return "post updated"
    },

    postDelete:async({id})=>{
        const post=await postModel.findByIdAndRemove(id)
        
        return "post deleted"
    }

}

const postQuerys={
    postGetByUser:async({token})=>{
        let payload = jwt.verify(token,process.env.SECRET)
        let user = await userModel.findById(payload.userID)
        const posts = await postModel.find({userId:user._id}).populate('userId')
        return posts.map((post)=>({...post.toJSON(),user:post.userId}))
    },
    postGetOne:async({id})=>{
        const post=await postModel.findById(id)
        return post
    }
}

var rootValue = { 
    ... userQuerys,
    ... userMutations,
    ...postMutations,
    ...postQuerys
}

module.exports=rootValue