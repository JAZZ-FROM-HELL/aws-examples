import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB client
const client = new DynamoDBClient({
    region: "eu-central-1", // specify your region
});

// Create DocumentClient wrapper
const docClient = DynamoDBDocumentClient.from(client);

// Read item from DynamoDB
async function getItem() {
    const params = {
        TableName: "Music",
        Key: {
            Artist: "No One You Know",
            SongTitle: "Call Me Today"
        }
    };

    try {
        const response = await docClient.send(new GetCommand(params));
        console.log("Success:", response.Item);
        return response.Item;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Usage
await getItem();