import express from "express";
import testData from "../test-data.json";
import cors from "cors";
import { connectMongoClient } from "./db";
import { ObjectId } from "mongodb";

const router = express.Router();
router.use(cors());
router.use(express.json());

//Get contest List
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


// Get contest by ID
router.get("/contest/:contestId", async (req, res) => {
    const client = await connectMongoClient();
    const singleContest = await client.collection("contests")
        .findOne({
            id: req.params.contestId
        });

    res.send({ contest: singleContest });
});

// Add new name
router.post("/contest/:contestId", async (req, res) => {

    const client = await connectMongoClient();
    const newContest = await client.collection("contests").findOneAndUpdate(
        { id: req.params.contestId },
        {
            $push: {
                names: {
                    id: req.body.newNameValue.toLowerCase().replace(/\s/g, "-"),
                    name: req.body.newNameValue,
                    timestamp: new Date()
                }
            }
        },
        { returnDocument: "after" }
    );

    res.send({ newContest: newContest.value });
});

//Add New Contest
router.post('/contest/', async (req, res) => {
    const requestBody = req.body;
    const client = await connectMongoClient();
    const newContest = await client.collection("contests").insertOne(
        {
            id: requestBody.contestName.toLowerCase().replace(/\s/g, '-'),
            categoryName: requestBody.contestName,
            contestName: requestBody.contestCategory,
            description: requestBody.contestDescription,
            names: [],
            timestamp: new Date()
        },
        { returnDocument: "after" }
    );

    const insertedId = newContest.insertedId;
    const retrievedData = await client.collection("contests").findOne({ _id: new ObjectId(insertedId) });

    res.send({ newContest: retrievedData });
});

export default router;