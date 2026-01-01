import { registerUser, userLogin } from "./auth.service.js";

//user register API
export async function register(req, res) {
  try {
    const {email, password} = req.body;

    const user = await registerUser({email, password});

    res.status(201).json({
      sucess:true,
      data:user,
    });
  } catch (error) {
    
    res.status(400).json({
      sucess:false,
      message:error.message,
    });
  }
}

// user login API
export async function login(req, res) {

  try {
    const {email, password} = req.body;

    const result = await userLogin({email, password});
        
    res.json({
      success:true,
      data:result,
    });
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message,
    });
  }
}


