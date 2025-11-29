// his function is consuming an event from an EventBridge bus
exports.handler = async function(event) {
    console.log('Received event from EventBridge:', JSON.stringify(event, null, 2));

    // Extract the detail from the EventBridge event
    const detail = event.detail;

    console.log('Event message:', detail.message);
    console.log('Event timestamp:', detail.timestamp);

    return {
        statusCode: 200,
        body: 'Event processed successfully'
    };
};