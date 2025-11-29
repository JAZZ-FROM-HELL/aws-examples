import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as events from 'aws-cdk-lib/aws-events';
import { EventPublisher } from './constructs/event-publisher';
import { EventConsumer } from './constructs/event-consumer';

export class HelloCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const eventBus = new events.EventBus(this, 'MyEventBus', {
            eventBusName: 'my-custom-event-bus'
        });

        const publisher = new EventPublisher(this, 'Publisher', {eventBus});
        const consumer = new EventConsumer(this, 'Consumer', {eventBus});

        new cdk.CfnOutput(this, "PublisherUrl", {
            value: publisher.functionUrl.url,
        });
    }
}