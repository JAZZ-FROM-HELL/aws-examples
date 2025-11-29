import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      // Define the EventBridge bus
      const eventBus = new events.EventBus(this, 'MyEventBus', {
          eventBusName: 'my-custom-event-bus'
      });

      // Define the Lambda function resource
      const myFunction = new lambda.Function(this, "HelloWorldFunction", {
          runtime: lambda.Runtime.NODEJS_22_X,
          handler: "publisher.handler",
          code: lambda.Code.fromAsset('lambda'),
          environment: {
              EVENT_BUS_NAME: eventBus.eventBusName
          }
      });

      // Define the Lambda function URL resource
      const myFunctionUrl = myFunction.addFunctionUrl({
          authType: lambda.FunctionUrlAuthType.NONE,
      });

      // Grant the Lambda function permission to put events on the bus
      eventBus.grantPutEventsTo(myFunction);

      // Define a CloudFormation output for your URL
      new cdk.CfnOutput(this, "myFunctionUrlOutput", {
          value: myFunctionUrl.url,
      })


      // Define the consumer Lambda function
      const consumerFunction = new lambda.Function(this, "EventConsumerFunction", {
          runtime: lambda.Runtime.NODEJS_22_X,
          handler: "consumer.handler",
          code: lambda.Code.fromAsset('lambda')
      });

      // Create EventBridge rule to route events to the consumer
      const rule = new events.Rule(this, 'HelloEventRule', {
          eventBus: eventBus,
          eventPattern: {
              source: ['my.lambda.function'],
              detailType: ['Hello Event']
          }
      });

      // Add the consumer Lambda as a target
      rule.addTarget(new targets.LambdaFunction(consumerFunction));
  }
}
