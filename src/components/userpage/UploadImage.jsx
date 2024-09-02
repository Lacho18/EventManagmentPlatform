import { logIn } from "../../store/userSlice";

/*
    1. Napravi go taka che da e zaduljitelno za organizatorite i pojelanie za ychasnicite
    2. Napravi go centrirano i da razmazva fona
    3. Positriy acauntite v bazata danni
    4. Dobavi kum join requesta za EventPage tova che se iziskva snimkata
    5. Zapochni stranicata koqto shte suzdava subitie
*/

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

  return (
    <div className="absolute top-1/2 left-1/2 z-50 border-spacing-2 bg-slate-500 p-12">
      <p>The organizer have to upload profile image</p>
      <input type="file" onChange={selectFileHandler} />
    </div>
  );
}
