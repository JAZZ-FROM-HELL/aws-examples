import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DeleteCommand, DynamoDBDocumentClient, UpdateCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const deleteSong = async () => {
    const command = new DeleteCommand({
        TableName: "Music",
        Key: {
            Artist: "No One You Know",
            SongTitle: "Apple Made This Impossible"
        },
        ReturnValues: "ALL_OLD",
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
};

await deleteSong();