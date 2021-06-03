import React from "react";

export const AdvertForm = (props) => {
  return (
    <form className='basic-form'>
      <div>
        <label htmlFor='title'>Title</label>
        <input id='title' type="text" name="title" defaultValue={props.defaultValues[0]}
               onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <input id='category' type="text" name="category" defaultValue={props.defaultValues[1]}
               onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea id='description' name="description" defaultValue={props.defaultValues[2]}
                  onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='price'>Price</label>
        <input id='price' type="text" name="price" defaultValue={props.defaultValues[3]}
               onChange={props.changeHandler}/>
      </div>
      <button className='btn' onClick={props.submitMethod}>Submit</button>
    </form>
  );
};