import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

import environment from '../../../env.json';

import path from "node:path";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export default class LambdaStack extends Stack {

    constructor(app: Construct, id: string, props?: StackProps) {
        super(app, id, props);

        const nextMoveLambda = new NodejsFunction(this, 'next-move-ticTacToe-nodeJS-lambda', {
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '..', 'Lambdas', 'calculateNextMove.ts'),
            handler: 'main',
            environment: {
                DEEPSEEK_KEY: environment["my-tic-tac-toe-key"]
            },
            timeout: Duration.seconds(15)
        });

        const checkDeepSeekWorkingLambda = new NodejsFunction(this, 'checkDeepSeekWorkingLambda', {
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname, "..", "Lambdas", "deepSeekWorking.ts"),
            handler: "main",
            environment: {
                DEEPSEEK_KEY: environment["my-tic-tac-toe-key"]
            },
            timeout: Duration.seconds(10)
        });

        const nextMoveLambdaIntegration = new LambdaIntegration(nextMoveLambda);
        const checkDeepSeekWorkingLambdaIntegration = new LambdaIntegration(checkDeepSeekWorkingLambda);

        const api = new RestApi(this, 'tic-tac-toe-api');
        const resources = api.root.addResource('ticTacToe');
        resources.addMethod('POST', nextMoveLambdaIntegration);
        resources.addMethod('GET', checkDeepSeekWorkingLambdaIntegration);
    }
}