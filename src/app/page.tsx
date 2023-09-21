import Counter from "../components/counter.component";
import ListUsers from "../components/users.component";
import './globals.css'
export default function Home() {
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div className="h-2 w-2 bg-red-400"></div>
      <Counter />
      <ListUsers />
    </main>
  );
}
