import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const updateSong = async () => {
    const command = new UpdateCommand({
        TableName: "Music",
        Key: {
            Artist: "No One You Know",
            SongTitle: "Apple Made This Impossible"
        },
        UpdateExpression: "set AlbumTitle = :albumTitle",
        ExpressionAttributeValues: {
            ":albumTitle": "Flying Spaghetti Monster",
        },
        ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
};

await updateSong();