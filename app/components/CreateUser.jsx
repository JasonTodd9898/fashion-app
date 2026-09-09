import "../custom.css";

export default function CreateUser() {
    const style = {
        maxWidth: 600,
        margin: "20px auto",
    }

    const inputForm = {
        width: "100%",
    }

    const signInButton = {
        width: "80%",
        backgroundColor: "#6b6dfb",
        color: "#fff",
        margin: "0 auto",
        padding: "8px",
        border: "none",
        borderRadius: "8px",
    }
    return (
        <form autoComplete="off" className="create-user-form" style={style}>
            <input type="text" placeholder="Name" className="form-input" autoComplete="off" style={inputForm} />
            <input type="email" placeholder="Email" className="form-input" autoComplete="new-password" style={inputForm} />
            <input type="password" placeholder="Password" className="form-input" autoComplete="new-password" style={inputForm} />
            <label style={{ fontSize: 12, fontWeight: "bold", margin: 0 }}>Date of Birth</label>
            <input type="date" placeholder="Date of Birth" className="form-input" style={inputForm} />
            <button type="submit" className="form-button" style={signInButton} >Sign in</button>
        </form>
    )
}