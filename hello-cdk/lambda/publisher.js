const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");
const eventBridge = new EventBridgeClient();

// his function is publishing an event to EventBridge bus
exports.handler = async function(event) {
    // Publish event to EventBridge
    const params = {
        Entries: [
            {
                Source: 'my.lambda.function',
                DetailType: 'Hello Event',
                Detail: JSON.stringify({
                    message: 'Hello from Lambda!',
                    timestamp: new Date().toISOString()
                }),
                EventBusName: process.env.EVENT_BUS_NAME
            }
        ]
    };

    try {
        const command = new PutEventsCommand(params);
        await eventBridge.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify('Hello CDK! Event published to EventBridge.'),
        };
    } catch (error) {
        console.error('Error publishing event:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error publishing event'),
        };
    }
};