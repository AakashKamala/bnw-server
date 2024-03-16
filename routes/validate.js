const User=require("../models/signup");

// const login = async (req, res) => {
//    try {
//        const { email, password } = req.body;
//        const userExist = await User.findOne({ email });

//        if (!userExist) {
//            return res.status(400).json({ error: "Invalid credentials", message: "Email doesn't exist" });
//        }
       
//        const user=await userExist.comparePassword(password);

//        if (user) {
//            return res.status(200).json({
//                success: true,
//                message: "Password matched. Login successful.",
//                token: await userExist.generateToken(),
//                userId: userExist._id.toString() 
//            });
//        } else {
//            return res.status(400).json({ error: "Invalid credentials", message: "Password doesn't match" });
//        }
//    } catch (error) {
//        console.error("Login: ", error);
//        return res.status(500).json({ error: "Internal server error", message: "Something went wrong on the server" });
//    }
// };


const user=async(req,res)=>
{
   try {
       const userData=req.user;
    //    console.log(userData);
       return res.status(200).json({userData});
   } catch (error) {
       console.log(`error from the user route ${error}`);
   }
}


// module.exports={login,user};

module.exports={user};