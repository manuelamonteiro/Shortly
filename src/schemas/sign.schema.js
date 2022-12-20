import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().min(1).max(50).required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).valid(joi.ref("password")).required()
});

export const signInSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().min(6).required()
});