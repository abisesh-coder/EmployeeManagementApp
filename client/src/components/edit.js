import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   FirstName: "",
   LastName: "",
   EmailId: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     FirstName: form.FirstName,
     LastName: form.LastName,
     EmailId: form.EmailId,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="FirstName">FirstName: </label>
         <input
           type="text"
           className="form-control"
           id="FirstName"
           value={form.FirstName}
           onChange={(e) => updateForm({ FirstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="LastName">LastName: </label>
         <input
           type="text"
           className="form-control"
           id="LastName"
           value={form.LastName}
           onChange={(e) => updateForm({ LastName: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="EmailID">EmailID: </label>
         <input
           type="text"
           className="form-control"
           id="EmailId"
           value={form.EmailId}
           onChange={(e) => updateForm({ EmailId: e.target.value })}
         />
       </div>
        
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}