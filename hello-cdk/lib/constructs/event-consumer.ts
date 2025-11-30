import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export interface EventConsumerProps {
    eventBus: events.EventBus;
}

export class EventConsumer extends Construct {
    public readonly function: lambda.Function;

    constructor(scope: Construct, id: string, props: EventConsumerProps) {
        super(scope, id);

        this.function = new lambda.Function(this, 'Function', {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: 'consumer.handler',
            code: lambda.Code.fromAsset('lambda')
        });

        const rule = new events.Rule(this, 'Rule', {
            eventBus: props.eventBus,
            eventPattern: {
                // source: ['my.lambda.function'],
                detailType: ['Hello Event']
            }
        });

        rule.addTarget(new targets.LambdaFunction(this.function));
    }
}