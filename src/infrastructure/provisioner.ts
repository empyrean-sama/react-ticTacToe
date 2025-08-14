import * as cdk from 'aws-cdk-lib';
import LambdaStack from './stacks/lambdaStack';

const app = new cdk.App();
const lambdaStack = new LambdaStack(app, 'lambda-stack-tic-tac-toe');