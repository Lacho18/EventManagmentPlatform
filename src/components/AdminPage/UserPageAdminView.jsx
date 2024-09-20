import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";

export default function UserPageAdminView() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function getUserData() {
      const result = await useFetch("allUsers", "GET", {
        conditions: { id: id },
      });

      setCurrentUser(result.data.allUsers[0]);
      console.log(result);
    }

    getUserData();
  }, []);

  if (!currentUser.id) return <div>Loading.....</div>;
  return (
    <div>
      <h1>User page</h1>
    </div>
  );
}
