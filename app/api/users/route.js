import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; 
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, dob } = await req.json();

    // 1. Validation
    if (!name || !email || !password || !dob) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save to MongoDB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth: dob,
    });

    // 5. Return success response \
    return NextResponse.json(
      {
        status: 'success',
        message: 'Account created successfully!',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          dateOfBirth: newUser.dateOfBirth,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error during user creation.', error: error.message },
      { status: 500 }
    );
  }
}