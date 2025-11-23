import { execSync } from 'child_process';

const args = process.argv.slice(2);
let functionName, file;

args.forEach(arg => {
    if (arg.startsWith('--functionName=')) {
        functionName = arg.split('=')[1];
    }
    if (arg.startsWith('--file=')) {
        file = arg.split('=')[1];
    }
});

if (!functionName || !file) {
    console.error('Usage: yarn deploy --functionName=<name> --file=<path>');
    process.exit(1);
}

try {
    console.log(`Deploying ${file} to Lambda function ${functionName}...`);
    execSync(`aws lambda update-function-code --function-name ${functionName} --zip-file fileb://${file}`, { stdio: 'pipe' });
    // Wait for the update to complete
    console.log('Waiting for update to complete...');
    execSync(
        `aws lambda wait function-updated --function-name ${functionName}`,
        { stdio: 'inherit' }
    );
    console.log('Publishing version...');
    const versionOutput = execSync(
        `aws lambda publish-version --function-name ${functionName} --description "Deployed ${file} at ${new Date().toISOString()}"`,
        { encoding: 'utf-8' }
    );
    console.log('✓ Deployment successful. Published version details:', versionOutput);
}
catch (error) {
    console.error('✗ Deployment failed:', error.message);
    process.exit(1);
}