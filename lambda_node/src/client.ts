import {InvokeCommand, LambdaClient} from '@aws-sdk/client-lambda'
import {OrderEvent} from "./index";

const lambdaClient = new LambdaClient({ region: 'eu-central-1' })

export type ClientResponse = {
    clientStatus: string;
}

export const handler = async (event: OrderEvent): Promise<ClientResponse> => {
    try {
        // Invooke your original Lambda function
        const invokeCommand = new InvokeCommand({
            FunctionName: 'myNodeFunction',
            InvocationType: 'Event', // Synchronous invocation
            Payload: JSON.stringify(event)
        })

        const response = await lambdaClient.send(invokeCommand);

        console.log('Lambda function invoked successfully. Rseponse StatusCode: ', response.StatusCode);

        return {
            clientStatus: 'success'
        };
    }
    catch (error) {
        console.error('Error invoking Lambda function:', error);
        throw error;
    }
}