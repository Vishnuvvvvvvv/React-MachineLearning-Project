import React, { useState } from 'react';


const MyNewForm = () => {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({

    latest_dir: '',
    writer: '',
    editor: '',
    main_lead: '',
    co_lead1: '',
  
    prd_cmpny1: '',
    prd_cmpny2: '',
    
    genre: ''
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
console.log("curr form data",formData)
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  console.log("subi")
console.log("curr form data after subm", JSON.stringify(formData))
    fetch('http://127.0.0.1:8002/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("result ",data.message)
        setResult(data.message);

      })
      .catch((error) => {
       console.log("EErr") 
       console.error('Error:', error);
 
      });
  };
  
  function getResultText(result){
switch(result){

case 1: return 'Flop'
             break;
case 2:return 'Average'
              break;
case 3:return 'Hit'
             break;
case 4:return 'Super-Hit'
             break;
case 5:return 'Block-Buster'
             break;
case 6:return 'All-Time-BlockBuster'	
          }
}  





      console.log("Final result",result)
  return (<div className="main-form-container">

<div className="form-container">
          <div className="form-title">Prediction Form</div>

     <form onSubmit={handleSubmit}>   
<div className="form-userdetails">





   <div className="form-input-box">
         <label>Director Name:</label>
        <input
          type=""
          name="latest_dir"
          value={formData.latest_dir}
          onChange={handleInputChange}
        />
</div>

   <div className="form-input-box">
          <label>writer Name:</label>
        <input
          type=""
          name="writer"
          value={formData.writer}
          onChange={handleInputChange}
        />
</div>


   <div className="form-input-box">
            <label>Editor Name:</label>
        <input
          type=""
          name="editor"
          value={formData.editor}
          onChange={handleInputChange}
        />
</div>


   <div className="form-input-box">
            <label>Main Lead:</label>
        <input
          type=""
          name="main_lead"
          value={formData.main_lead}
          onChange={handleInputChange}
        />
</div>


   <div className="form-input-box">     
        <label>Co Lead1:</label>
        <input
          type=""
          name="co_lead1"
          value={formData.co_lead1}
          onChange={handleInputChange}
        />
</div>



   <div className="form-input-box">
          <label>Production Company1:</label>
        <input
          type=""
          name="prd_cmpny1"
          value={formData.prd_cmpny1}
          onChange={handleInputChange}
        />
</div>
         


   <div className="form-input-box">
  <label>Production Company2:</label>
        <input
          type=""
          name="prd_cmpny2"
          value={formData.prd_cmpny2}
          onChange={handleInputChange}
        />
</div>




   <div className="form-input-box">
          <label>Genres:</label>
        <input
          type=""
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
</div>
        {/* Add other input fields here */} 
      </div>
    <div className="form-button-class">
    <button type="submit">Submit</button>
    </div>
    </form>
     </div>
    

 
 
      {/* Render the result */}
   {result && <div className="form-Result"> {getResultText(result)}</div>} 
   
</div>
  );
};

export default MyNewForm;
