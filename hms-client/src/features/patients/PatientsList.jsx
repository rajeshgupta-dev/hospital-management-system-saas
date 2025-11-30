import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PatientsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["patients"], // must be an array or string
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users?role=patient");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading patients...</p>;
  if (error) return <p>Error fetching patients</p>;

  return (
    <div>
      <h2>Patients List</h2>
      <ul>
        {data.map((patient) => (
          <li key={patient.id}>{patient.firstName} {patient.lastName}</li>
        ))}
      </ul>
    </div>
  );
}
