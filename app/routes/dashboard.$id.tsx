import { useParams } from "@remix-run/react";

export default function DashboardId() {
  const { id } = useParams();
  return (
    <div>
      <h1>Dashboard Id {id}</h1>
    </div>
  );
}
