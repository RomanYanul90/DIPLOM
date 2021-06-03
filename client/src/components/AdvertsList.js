import React, {useState} from "react";
import {AdvertCard} from "./statelessComponents/AdvertCard";
import {Link} from "react-router-dom";

export const AdvertsList = ({adverts}) => {
  const [sortParam, setSortParam] = useState("price");

  if (!adverts.length) {
    return <p>There is no adverts created by current user</p>;
  }

  const sortAdverts = (adverts, sortParam) => {
    // eslint-disable-next-line array-callback-return
    return adverts.sort((a, b) => {
      if (sortParam === "price") {
        return a.price - b.price;
      }
      if (sortParam === "created") {
        return Date.parse(b.created) - Date.parse(a.created);
      }
    });
  };

  return (
    <div className='adverts-list'>
      <div className='sort-select'>
        <label htmlFor='sort'>Sort by: </label>
        <select id='sort' onChange={(e) => {
          setSortParam(e.target.value);
        }}>
          <option value='price'>Price</option>
          <option value='created'>Date</option>
        </select>
      </div>

      {sortAdverts(adverts, sortParam).map((el) => {
        return <div key={el.id}>
          <Link to={`/advert/${el.id}`}>
            <AdvertCard advert={el}/>
          </Link>
        </div>;
      })}
    </div>
  );
};