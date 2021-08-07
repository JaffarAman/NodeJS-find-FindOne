const Express = require("express");
const app = Express();
const port = 5000;
const cors = require("cors")

////Import  mongoose ///
const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://admin:admin@cluster0.klpzb.mongodb.net/dev"

///IMPORT SCHEMA //////
const postModel = require("./schema")

///mongoose CONNECTED/////
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
////MONGOOSE CONNTECT CHECK???///////


////SEND DATA IN MONGO DB ATLAS /////
// app.post("/add",(req,res)=>{
//         postModel.create({id:"101",Name:"Jaffar Aman", batch:"Web and Mobile"} , (error,data)=>{
//             if(error){
//                 res.send(eroor.message)
//             }else{
//                 res.send(JSON.stringify("OH"))
//             }
//         })
// })




mongoose.connection.on("connected", () => console.log("MONGOOSE IS CONNECTED"))
mongoose.connection.on("error", (error) => console.log("MONGOOSE ERROR " + error.message))



//////CLASS 04  WORKINGGG/////

// allow body
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json())
app.use(cors());

////data jarha hai database pr body postman sy arhi hai/////
app.post("/create", (req, res) => {
    let body = req.body
    try {
        postModel.create(body, (error, data) => {
            if (error) {
                throw error
            }
            else {
                console.log(req.body)
                res.send("Data is Successfully Create...")
            }
        }
        )
    }
    catch (error) {
        console.log("ERROR==>", error);
    }



})
///data arha hai database sy ///
///sub data ajye gaw/////
app.get("/posts", (req, res) => {
    postModel.find({}, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send(JSON.stringify(data))
        }
    })
})


////HEADERS SY data nikal rhy hai is main Headers sy key arhi hai or osky hisab sy data ly kr ajye gaw/////
app.get("/finds", (req, res) => {
    try {
        const { name } = req.headers
        console.log(name)
        const query = {}
        if (name) {
            query.name = name
        }
        postModel.find(query, (err, data) => {
            if (err) {
                throw err
            }
            else {
                res.send(JSON.stringify(data))
            }
        })

    } catch (error) {
        console.log("ERROR ==>", error);
    }
})


/////HEADER SY SIRF FIND ONE WALA KAM HORHA HAI JO PEHLY MIL JAYE GAW OSKO ly kr ao....////
// app.get("/findOne", (req,res)=>{
//     const {name} = req.headers
//     const query = {
//         name : name
//     }
// try {
//     if(query.name){
//         postModel.findOne(query,(err,data)=>{
//             if(err){
//                 throw err
//             }else{
//                 res.send(JSON.stringify(data))
//             }
//         })
//     }
// } catch (error) {
//         console.log(error);
// }
//     }
// )



//////CLASS 1 Revision/////
{

    ////middle Ware////

    // app.use("/about",(req,res,next)=>{
    //     let user = true
    //     if(user){
    //         next()
    //     }
    //     else{
    //         res.send("User Is not Here...")
    //     }
    // })



    // app.get("/about",(req,res)=>{
    //     res.send("about us page...")
    // })


    ///POST METHOD////
    // app.post("/about",(req,res)=>{
    //     res.send("about us page...")
    //     console.log(req); 
    // })



    // app.get("/",(req,res)=>{
    //     res.send("HOME PAGE...")
    // })

}

app.get("/", (req, res, next) => {
    res.send("HOME PAGE....")
})


app.listen(port, () => console.log("Server is Running on localhost:" + port));
