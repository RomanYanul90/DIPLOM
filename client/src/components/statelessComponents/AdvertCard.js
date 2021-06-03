import React from "react";

export const AdvertCard = ({advert}) => {
  return (
    <article className='advert-card'>
      <h2>{advert.title}</h2>
      <p>Category: {advert.category}</p>
      <p>Description: {advert.description}</p>
      <p>Price: {advert.price}$</p>
      <p>Views: {advert.views}</p>
      <p>Created by: {advert.ownerUserName}</p>
      <p>Created: {new Date(advert.created).toLocaleString()}</p>
      {advert.modified && <p>Modified: {new Date(advert.modified).toLocaleString()}</p>}
    </article>
  );
};