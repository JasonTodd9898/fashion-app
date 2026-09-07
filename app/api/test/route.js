import dbConnect from '@/lib/db';

export async function GET() {
    try {
        await dbConnect();
        return Response.json({ status: 'success', message: 'Connected to MongoDB!' });
    } catch (error) {
        return Response.json(
            { status: 'error', message: error.message },
            { status: 500 }
        );
    }
}