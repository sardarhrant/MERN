import { MongoClient } from "mongodb";
import { MOGODB_URI, DATABASE_NAME } from "./config";

let connectedClient;

export const connectClient = async () => {
    if (connectedClient) {
        connectedClient.db(DATABASE_NAME);
    }

    const client = new MongoClient(MOGODB_URI);
    await client.connect();
    await client.db(DATABASE_NAME).command({ ping: 1 });
    console.info("Connected to MongoDB");
    connectedClient = client;

    return connectedClient.db(DATABASE_NAME);
};

export const disConnectClient = async () => {
    await connectedClient?.close();
    console.info("Disconnected from MongoDB");
};