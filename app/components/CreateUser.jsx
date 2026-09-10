import "../custom.css";

export default function CreateUser() {
    return (
        <form autoComplete="off" className="create-user-form">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" autoComplete="new-password" />
            <label style={{ fontSize: 12, fontWeight: "bold", margin: 0 }}>Date of Birth</label>
            <input type="date" placeholder="Date of Birth" className="form-input" />
            <div className="btnStyle">
                <button type="submit" className="form-button" >Back</button>
                <button type="submit" className="form-button" >Sign In</button>
            </div>

        </form>
    )
}