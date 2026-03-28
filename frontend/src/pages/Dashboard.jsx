import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user , fetchUser } = useAuth(); 
  fetchUser();

  return <h1 className="mt-20 text-2xl font-bold capitalize">{user.slug}'s dashboard</h1>;
}