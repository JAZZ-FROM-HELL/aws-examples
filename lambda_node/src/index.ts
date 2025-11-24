import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({ region: 'eu-central-1' });

export type OrderEvent = {
    order_id: string;
    amount: number;
    item: string;
}

export type OrderResponse = {
    status: string;
}

/**
 * Lambda handler for processing orders and storing receipts in S3.
 */
export const handler = async (event: OrderEvent): Promise<OrderResponse> => {
    try {
        // Access environment variables
        const bucketName = process.env.RECEIPT_BUCKET;
        if (!bucketName) {
            throw new Error('RECEIPT_BUCKET environment variable is not set');
        }

        // Create the receipt content and key destination
        const receiptContent = `Order ID: ${event.order_id}\nAmount :$${event.amount.toFixed(2)}\nItem: ${event.item}`;
        const key = `receipts/${event.order_id}-${uuidv4()}.txt`;

        // Upload the receipt to S3
        await uploadReceiptToS3(bucketName, key, receiptContent);

        console.log(`Successfull processed order ${event.order_id} and stored receipt in S3 bucket ${bucketName}`);
        return { status: 'Success' }
    }
    catch (error) {
        console.error(`Failed to process order: ${error instanceof Error ? error.message : 'unknown error'}`);
        throw error;
    }
};

/**
 * Helper function to upload receipt to S3
 */
async function uploadReceiptToS3(bucketName: string, key: string, receiptContent: string) {
    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: receiptContent,
        });
        await s3Client.send(command);
    } catch (error) {
        throw new Error(`Failed to upload receipt to S3: ${error instanceof Error ? error.message : 'unknown error'}`)
    }
}

console.log('Hello Lambda! I am ready ✨')
