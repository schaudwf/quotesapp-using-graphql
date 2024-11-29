import {ApolloServer, gql} from "apollo-server"

import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import typeDefs from "./schema.js"

import mongooose from "mongoose"
import { JWT_SECRET, MONGO_URL } from "./config.js"
import  jwt from "jsonwebtoken"

mongooose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongooose.connection.on("connected", ()=> {
    console.log("connected to mongodb");
})

mongooose.connection.on("error", (err)=> {
    console.log("err connecting", err);
})
//import models  here
import "./models/quotes.js"
import "./models/user.js"
import resolvers from "./resolvers.js"

//this is MiddleWare
const context = ({req})=>{
    const {authorization}=   req.headers
    if(authorization){
const {userId}=jwt.verify(authorization, JWT_SECRET)
return {userId}
    }
  }

const Server = new ApolloServer({

    typeDefs,
    resolvers,
    context,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
}
)


Server.listen().then(({url}) =>{

    console.log(`Server Ready at ${url}`)
})
