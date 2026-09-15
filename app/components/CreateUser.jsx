'use client';

import { useState } from 'react';
import "../custom.css";

export default function CreateUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
    });
    const [status, setStatus] = useState({ loading: false, message: '', error: false });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault(); // stops the browser's default full-page form submission

        setStatus({ loading: true, message: '', error: false });

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus({ loading: false, message: data.message || 'Something went wrong.', error: true });
                return;
            }

            setStatus({ loading: false, message: 'Account created successfully!', error: false });
            setFormData({ name: '', email: '', password: '', dob: '' }); // clear the form
        } catch (err) {
            setStatus({ loading: false, message: 'Network error. Please try again.', error: true });
        }
    }

    return (
        <form autoComplete="off" className="create-user-form" onSubmit={handleSubmit}>
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
            <label style={{ fontSize: 12, fontWeight: "bold", margin: 0 }}>Date of Birth</label>
            <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                className="form-input"
                value={formData.dob}
                onChange={handleChange}
                required
            />

            {status.message && (
                <p style={{ color: status.error ? 'red' : 'lightgreen', fontSize: 13 }}>
                    {status.message}
                </p>
            )}

            <div className="btnStyle">
                <button type="button" className="form-button">Back</button>
                <button type="submit" className="form-button" disabled={status.loading}>
                    {status.loading ? 'Creating...' : 'Sign In'}
                </button>
            </div>
        </form>
    )
}