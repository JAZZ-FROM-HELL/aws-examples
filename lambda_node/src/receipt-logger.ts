import { S3Event } from 'aws-lambda'

export const handler = async (event: S3Event) : Promise<void> => {
    // Parse the S3 event
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;

        console.log(`Order receipt ${key} was added to S3 bucket ${bucket}.`)
    }
}