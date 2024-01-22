import { NextResponse } from 'next/server';
import prisma from '@/server/db';
import { revalidatePath } from 'next/cache';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const uploadFileToS3 = async (file, fileName, id) => {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Key: `${id}/${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/png',
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
};

export async function POST(req: Request) {
  const body = await req.json();

  const {
    userId,
    name,
    lastname,
    phone,
    email,
    title,
    city,
    whereDidFind,
    exactLocation,
    description,
    findingDate,
    findingTime,
    mapAddress,
    photo,
    label,
  } = body;
  try {
    const fileBuffer = Buffer.from(photo, 'base64');
    console.log('fileBuffer:', fileBuffer);

    const timestamp = Date.now();
    const dynamicFileName = `${timestamp}.jpeg`;
    const fileName = await uploadFileToS3(fileBuffer, dynamicFileName, userId); // Replace 'example' with your desired file name

    console.log('fileName upload', fileName);

    const userPost = await prisma?.lostAndFound.create({
      data: {
        user: {
          connect: {
            externalId: userId,
          },
        },
        name,
        lastname,
        phone,
        email,
        title,
        city,
        whereDidFind,
        exactLocation,
        description,
        findingDate,
        findingTime,
        mapAddress,
        photo: fileName,
        label,
      },
    });
    revalidatePath('/posts');
    console.log('User Post:', userPost);
    return NextResponse.json({ data: userPost });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
