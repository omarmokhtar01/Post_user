/*
Query: to get data
Mutation: post,update,delete
Subscription: Real-time
*/
var {  buildSchema } = require("graphql")

// String!    => required
// usersGet:[User!]!   should back user and array
var schema = buildSchema(`


type Post{
  title:String!,
  content:String!
  user:User
},
type User{
  id:String!,
  name:String!,
  email:String!,
  password:String!,
  phone:String!,
  posts:[Post]
},

input UserInput{
  
  name:String!,
  email:String!,
  password:String!,
  phone:String!,
}

input UserLogin{
  email:String!,
  password:String!
}

,type Query {
  usersGet:[User!]!
  userGetOne(id:String!):User
  postGetByUser(token:String!):[Post]
  postGetOne(id:String!):Post
  }

  type Mutation {
    usersCreate(regis:UserInput): User
    userLogin(input:UserLogin):String
    postCreate(title:String!,content:String!,token:String!):String
    postUpdate(id:String!,title:String!,content:String!):String
    postDelete(id:String!):String
    
  }
`)

module.exports = schema