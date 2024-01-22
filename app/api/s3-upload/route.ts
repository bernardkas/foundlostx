import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const uploadFileToS3 = async (file, fileName) => {
  const fileBuffer = file;
  console.log('fileName', fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Key: `${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: 'image/jpeg',
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ err: 'Invalid file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer()) as Buffer;
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (err) {
    return NextResponse.json({ error: 'Not Uplaoded' });
  }
};
