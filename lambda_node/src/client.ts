import {InvokeCommand, LambdaClient} from '@aws-sdk/client-lambda'
import {OrderEvent, OrderResponse} from "./index";

const lambdaClient = new LambdaClient({ region: 'eu-central-1' })

export type ClientResponse = {
    clientStatus: string;
    orderResponse: OrderResponse;
}

export const handler = async (event: OrderEvent): Promise<ClientResponse> => {
    try {
        // Invooke your original Lambda function
        const invokeCommand = new InvokeCommand({
            FunctionName: 'myNodeFunction',
            InvocationType: 'RequestResponse', // Synchronous invocation
            Payload: JSON.stringify(event)
        })

        const response = await lambdaClient.send(invokeCommand);

        // Parse the response from the original Lambda function
        const payload: OrderResponse = JSON.parse(Buffer.from(response.Payload ?? '').toString())

        console.log('Lambda function invoked successfully:', payload);

        return {
            clientStatus: 'success',
            orderResponse: payload
        };
    }
    catch (error) {
        console.error('Error invoking Lambda function:', error);
        throw error;
    }
}