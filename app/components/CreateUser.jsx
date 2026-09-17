'use client';

import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/fire-base';
import "../custom.css";

export default function CreateUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
    });

    const [status, setStatus] = useState({
        loading: false,
        message: '',
        error: false
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setStatus({ loading: true, message: '', error: false });

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus({
                    loading: false,
                    message: data.message || 'Something went wrong.',
                    error: true
                });
                return;
            }

            setStatus({
                loading: false,
                message: 'Account created successfully!',
                error: false
            });

            setFormData({
                name: '',
                email: '',
                password: '',
                dob: ''
            });

        } catch (err) {
            setStatus({
                loading: false,
                message: 'Network error. Please try again.',
                error: true
            });
        }
    }

    async function handleGoogleSignIn() {
        try {
            setStatus({
                loading: true,
                message: '',
                error: false
            });

            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            console.log("Google User:", user);
            console.log("Name:", user.displayName);
            console.log("Email:", user.email);
            console.log("Firebase UID:", user.uid);

            setStatus({
                loading: false,
                message: `Signed in as ${user.email}`,
                error: false
            });

        } catch (error) {
            console.error("Google Sign-In Error:", error);

            setStatus({
                loading: false,
                message: 'Google sign-in failed. Please try again.',
                error: true
            });
        }
    }

    return (
        <form
            autoComplete="off"
            className="create-user-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <label style={{ fontSize: 12, fontWeight: "bold", margin: 0 }}>
                Date of Birth
            </label>

            <input
                type="date"
                name="dob"
                className="form-input"
                value={formData.dob}
                onChange={handleChange}
                required
            />

            {status.message && (
                <p
                    style={{
                        color: status.error ? 'red' : 'lightgreen',
                        fontSize: 13
                    }}
                >
                    {status.message}
                </p>
            )}

            <div className="btnStyle">
                <button type="button" className="form-button">
                    Back
                </button>

                <button
                    type="submit"
                    className="form-button"
                    disabled={status.loading}
                >
                    {status.loading ? 'Creating...' : 'Sign In'}
                </button>
            </div>

            {/* Google Sign-In */}
            <div style={{
                textAlign: "center",
                margin: "15px 0 10px"
            }}>
                <span style={{ fontSize: 13 }}>
                    OR
                </span>
            </div>

            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="form-button"
                disabled={status.loading}
                style={{
                    width: "100%"
                }}
            >
                Continue with Google
            </button>

        </form>
    );
}