import { uploadFileToS3 } from '@/lib/action';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file[]');

    const fileNames = await Promise.all(
      files.map(async file => {
        // @ts-ignore
        const bufferPhoto = Buffer.from(await file.arrayBuffer());
        // @ts-ignore
        return uploadFileToS3(bufferPhoto, file.name);
      })
    );

    req.headers.set('Content-Disposition', 'view');

    return NextResponse.json({ success: true, fileNames });
  } catch (error) {
    return NextResponse.json({ error: `Error post data` });
  }
}
