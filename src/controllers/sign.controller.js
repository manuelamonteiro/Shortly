import connectionDB from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';

export async function postSignUp(req, res) {

    const user = req.body;
    const hashPassword = bcrypt.hashSync(user.password, 10);

    try {
        await connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
            [user.name, user.email, hashPassword]);

        res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function postSignIn(req, res) {

    const { email, password } = req.body;
    const token = uuidV4();

    try {
        const isUserExists = await connectionDB.query(`SELECT * FROM users WHERE email=$1;`, [email]);

        if (isUserExists.rows.length === 0) {
            res.status(401).send({ message: "Usuário e/ou senha incorretos!" });
            return;
        }

        const passwordOk = bcrypt.compareSync(password, isUserExists.rows[0].password);

        if (!passwordOk) {
            res.status(401).send({ message: "Usuário e/ou senha incorretos!" });
            return;
        }

        await connectionDB.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
            [isUserExists.rows[0].id, token]);

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function getUserUrls(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const userSession = await connectionDB.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        const userUrls = await connectionDB.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount",
        json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount"))
        AS "shortenedUrls" FROM users JOIN urls ON users.id = urls."userId" WHERE users.id =$1 GROUP BY users.id;`, [userSession.rows[0].userId]);

        res.status(200).send(userUrls.rows);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}