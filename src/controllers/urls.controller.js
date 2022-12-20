import connectionDB from "../database/db.js";
import { nanoid } from 'nanoid'

export async function postUrls(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const { url } = req.body;
    const shortUrl = nanoid(8);

    try {
        const userSession = await connectionDB.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        await connectionDB.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);`,
            [url, shortUrl, userSession.rows[0].userId]);

        res.status(201).send({ shortUrl });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function getUrlsById(req, res) {

    const { id } = req.params;

    try {
        const shortUrl = await connectionDB.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1;`, [id]);

        res.status(200).send(shortUrl.rows[0])
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function openUrl(req, res) {

    const { shortUrl } = req.params;

    try {
        const shortUrlSelected = await connectionDB.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);
        const shortUrlId = shortUrlSelected.rows[0].id;

        const visitCount = Number(shortUrlSelected.rows[0].visitCount) + 1;
        await connectionDB.query(`UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;`, [visitCount, shortUrl]);

        res.redirect("/urls/" + shortUrlId);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export async function deleteUrl(req, res) {

    const { id } = req.params;

    try {
        await connectionDB.query("DELETE FROM urls WHERE id=$1;", [id]);

        res.status(204).send({ message: "ShortUrl deletada com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}