import connectionDB from "../database/db.js";
import { signInSchema, signUpSchema } from "../schemas/sign.schema.js";

export async function userSignUpValidation(req, res, next) {

    const user = req.body;

    const validationStatus = signUpSchema.validate(req.body, { abortEarly: false });

    if (validationStatus.error) {
        const error = validationStatus.error.details.map((detail) => detail.message);
        res.status(422).send({ message: error });
        return;
    };

    try {
        const isUserExists = await connectionDB.query(`SELECT * FROM users WHERE email=$1;`, [user.email]);

        if (isUserExists.rows.length !== 0) {
            res.status(409).send({ message: "Esse e-mail já está cadastrado!" });
            return;
        };
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    next();

}

export function userSignInValidation(req, res, next) {

    const validationStatus = signInSchema.validate(req.body, { abortEarly: false });

    if (validationStatus.error) {
        const error = validationStatus.error.details.map((detail) => detail.message);
        res.status(422).send({ message: error });
        return;
    };

    next();

}

export async function userExistence(req, res){

}