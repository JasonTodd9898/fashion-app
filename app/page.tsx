import CreateUser from "./components/CreateUser";

export default function Home() {
  const logo = {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    margin: "20px 0"
  }
  return (
    <div>
      <h1 style={logo}>Fashion App</h1>
      <CreateUser />
    </div>
  );
}
