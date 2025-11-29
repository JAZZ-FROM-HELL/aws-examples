import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const addSong = async () => {
    const command = new PutCommand({
        TableName: "Music",
        Item: {
            Artist: "No One You Know",
            SongTitle: "Apple Made This Impossible",
            AlbumTitle: "The Friend From Utopia",
        }
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
};

await addSong();