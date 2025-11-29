import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB client
const client = new DynamoDBClient({
    region: "eu-central-1",
});

// Create DocumentClient wrapper
const docClient = DynamoDBDocumentClient.from(client);

// Query all songs by an artist
async function querySongsByArtist() {
    const params = {
        TableName: "Music",
        KeyConditionExpression: "Artist = :artist",
        ExpressionAttributeValues: {
            ":artist": "No One You Know"
        },
        ProjectionExpression: "Artist, SongTitle"
    };

    try {
        const response = await docClient.send(new QueryCommand(params));
        console.log("Success:", response.Items);
        console.log("Count:", response.Count);
        return response.Items;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Usage
await querySongsByArtist();
