import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';

export interface EventPublisherProps {
    eventBus: events.EventBus;
}

export class EventPublisher extends Construct {
    public readonly function: lambda.Function;
    public readonly functionUrl: lambda.FunctionUrl;

    constructor(scope: Construct, id: string, props: EventPublisherProps) {
        super(scope, id);

        this.function = new lambda.Function(this, 'Function', {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: 'publisher.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                EVENT_BUS_NAME: props.eventBus.eventBusName
            }
        });

        props.eventBus.grantPutEventsTo(this.function);

        this.functionUrl = this.function.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
        });
    }
}