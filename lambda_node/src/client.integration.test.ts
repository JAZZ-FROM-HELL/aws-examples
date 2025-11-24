import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import orderData from '../fixtures/order.json';
import {ClientResponse} from "./client";

const lambda = new LambdaClient({ region: 'eu-central-1' });

test('invokes Lambda client function', async () => {
    const response = await lambda.send(new InvokeCommand({
        FunctionName: 'myClientFunction',
        Payload: JSON.stringify(orderData)
    }));

    const result:ClientResponse = JSON.parse(Buffer.from(response.Payload ?? '').toString('utf8'));

    expect(result).toEqual({
        clientStatus: 'success'
    });
});