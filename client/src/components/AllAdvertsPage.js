import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertsList} from "./AdvertsList";

export const AllAdvertsPage = () => {
  const [adverts, setAdverts] = useState([]);
  const [searchParams, setSearchParams] = useState({title: ""});
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchAdverts = useCallback(async () => {
    try {
      const fetched = await request("/api/advert/", "GET", null,
        {Authorization: `Bearer ${token}`}
      );
      setAdverts(fetched);
    } catch (e) {
    }
  }, [token, request]);

  useEffect(() => {
    fetchAdverts();
  }, [fetchAdverts]);

  const changeInputHandler = (e) => {
    setSearchParams({title: e.target.value});

  };

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const fetched = await request(`/api/advert/byTitle/${searchParams.title}`, "GET", null,
        {Authorization: `Bearer ${token}`}
      );
      setAdverts(fetched);
    } catch (e) {
    }
  };

  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <section className='all-adverts-section'>
      <form className='search-form'>
        <label htmlFor='title'>Find advert by title</label>
        <div className='search-form-input'>
          <input id='title' type='text' name='title' placeholder='Title:' onChange={changeInputHandler}/>
          <button className='btn' onClick={searchHandler}>Search</button>
        </div>
      </form>
      {!adverts.length || loading ? <p>No adverts</p> : <AdvertsList adverts={adverts}/>}
    </section>
  );
};