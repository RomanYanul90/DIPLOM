import React, {useState, useContext, useEffect, useCallback} from "react";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertsList} from "./AdvertsList";
import {useHttp} from "../hooks/httpHook";

export const UserAdvertsPage = () => {
  const [adverts, setAdverts] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchAdverts = useCallback(async () => {
    try {
      const fetched = await request("/api/advert/userAdverts", "GET", null,
        {Authorization: `Bearer ${token}`}
      );
      setAdverts(fetched);
    } catch (e) {
    }
  }, [token, request]);

  useEffect(() => {
    fetchAdverts();
  }, [fetchAdverts]);

  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <section className='user-adverts-section'>
      <h2>My adverts</h2>
      {!loading && <AdvertsList adverts={adverts}/>}
    </section>
  );
};