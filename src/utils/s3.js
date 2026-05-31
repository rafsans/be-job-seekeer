import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
// Ensure env variables are available
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const endpoint = process.env.AWS_ENDPOINT_URL;
const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    ...(endpoint && { endpoint }),
    forcePathStyle: !!endpoint,
});
export async function uploadToS3(fileBuffer, fileName, mimeType, folder = "resumes") {
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
        throw new Error("AWS_BUCKET_NAME is not configured in .env");
    }
    const ext = fileName.includes('.') ? `.${fileName.split('.').pop()}` : '';
    const fileKey = `${folder}/${crypto.randomUUID()}${ext}`;
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: mimeType,
        ACL: "public-read",
    });
    await s3Client.send(command);
    if (endpoint) {
        const baseUrl = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint;
        return `${baseUrl}/${bucketName}/${fileKey}`;
    }
}
