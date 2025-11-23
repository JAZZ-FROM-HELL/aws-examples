import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import orderData from '../fixtures/order.json';
import orderResponse from '../fixtures/response.json';

const lambda = new LambdaClient({ region: 'eu-central-1' });

test('invokes actual Lambda function', async () => {
    const response = await lambda.send(new InvokeCommand({
        FunctionName: 'myNodeFunction',
        Payload: JSON.stringify(orderData)
    }));

    const result = JSON.parse(Buffer.from(response.Payload ?? '').toString('utf8'));
    expect(result).toEqual(orderResponse);
});