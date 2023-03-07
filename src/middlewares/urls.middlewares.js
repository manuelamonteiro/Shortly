import connectionDB from "../database/db.js";
import { urlSchema } from "../schemas/urls.schema.js";

export async function loginAuthorization(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        res.status(401).send({ message: "Você não está autorizado a prosseguir!" });
        return;
    }

    try {
        const isSessionExists = await connectionDB.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        if (isSessionExists.rows.length === 0) {
            res.status(401).send({ message: "O usuário não está logado!" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    next();
}

export function urlsValidation(req, res, next) {

    const validationStatus = urlSchema.validate(req.body, { abortEarly: false });

    if (validationStatus.error) {
        const error = validationStatus.error.details.map((detail) => detail.message);
        res.status(422).send({ message: error });
        return;
    };

    next();
}

export async function shortUrlExistenceById(req, res, next) {

    const { id } = req.params;

    try {
        const isShortUrlExists = await connectionDB.query(`SELECT * FROM urls WHERE id=$1;`, [id]);

        if (isShortUrlExists.rows.length === 0) {
            res.status(404).send({ message: "A shortUrl não existe!" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    next();

}

export async function shortUrlExistence(req, res, next) {

    const { shortUrl } = req.params;

    try {
        const isShortUrlExists = await connectionDB.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);

        if (isShortUrlExists.rows.length === 0) {
            res.status(404).send({ message: "A shortUrl não existe!" });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    next();

}

export async function shortUrlOwnerValidation(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const { id } = req.params;

    try {
        const shortUrlByUser = await connectionDB.query(`SELECT * FROM urls JOIN sessions ON urls."userId" = sessions."userId" WHERE urls.id=$1 AND sessions.token=$2;`, [id, token]);

        if (shortUrlByUser.rows.length === 0) {
            res.status(401).send({ message: "A shortUrl não pertence ao usuário!" });
            return;
        }

        // const userSession = await connectionDB.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        // const userUrl = await connectionDB.query(`SELECT * FROM urls WHERE id=$1;`, [id]);

        // if(userSession.rows[0].userId !== userUrl.rows[0].userId){
        //     res.status(401).send({message: "A shortUrl não pertence ao usuário!"});
        //     return;
        // }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

    next();

}