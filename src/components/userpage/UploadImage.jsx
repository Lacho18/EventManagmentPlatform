import useFetch from "../../hooks/useFetch";
import { logIn } from "../../store/userSlice";

export default function UploadImage({ userData, dispatch }) {
  async function selectFileHandler(event) {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", userData.id);

    const result = await fetch("http://localhost:3000/uploadImage", {
      method: "POST",
      body: formData,
    });

    const response = await result.json();
    console.log(response.message);
    dispatch(logIn(response.data));
  }

  async function closeWindowHandler() {
    const result = await useFetch("uploadImage", "PUT", {
      isClosed: true,
      userId: userData.id,
    });

    if (result.status === 200) {
      dispatch(logIn(result.data.data));
    } else {
      console.log(result.data.message);
    }
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 z-50 border-spacing-2 bg-slate-500 p-12 rounded"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {userData.role === "participant" && (
        <button className="w-3 h-3 p-3 text-2xl" onClick={closeWindowHandler}>
          X
        </button>
      )}
      {userData.role === "organizer" ? (
        <p className="font-bold text-red-700 pb-10 text-xl">
          The organizer have to upload profile image
        </p>
      ) : (
        <p className="pb-10 text-green-700 font-bold text-xl">
          If you want you can set profile image now
        </p>
      )}
      <input type="file" onChange={selectFileHandler} />
    </div>
  );
}
