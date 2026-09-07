import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}


let cached = global.mongooseConnection;

if (!cached) {
    cached = global.mongooseConnection = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn; // already connected, reuse it
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { bufferCommands: false })
            .then((mongooseInstance) => mongooseInstance);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;