import express from "express";
import testData from "../test-data.json";
import cors from "cors";
import { connectMongoClient } from "./db";

const router = express.Router();
router.use(cors());

router.get('/contests', async (req, res) => {
    const client = await connectMongoClient();
    const contests = await client.collection("contests")
        .find()
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1,
            _id: 0
        })
        .toArray();

    res.send({ contests });
});

router.get("/contest/:contestId", async (req, res) => {
    const client = await connectMongoClient();
    const singleContest = await client.collection("contests")
        .findOne({
            id: req.params.contestId
        });

    res.send({ contest: singleContest });
});

export default router;