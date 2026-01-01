import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createNewUser } from '../../db/repositories/user.repository.js';

const SALT_ROUNDS = 10;

//new user register...
export async function registerUser({email, password}){
  const existingUser = await findUserByEmail(email);
  
  if (existingUser){
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createNewUser({email, passwordHash});

  return user;

}

//user login
export async function userLogin({email, password}) {
  
  const user = await findUserByEmail(email);
  
  if(!user || !user.is_active){
    throw new Error("Invaild credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
  if(!isPasswordValid){
    throw new Error("Please Enter Right Credentials");
  }

  const token = jwt.sign(
    {userId:user.id},
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_SECRET_EXPIRES_IN || "1d"}
  );
  
  return {token};

}

