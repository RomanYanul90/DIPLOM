import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertsList} from "./AdvertsList";

export const ChoosenUserAdverts = ({ownerName}) => {
  console.log("ChoosenUserAdverts");
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [adverts, setAdverts] = useState([]);

  const getAdverts = useCallback(async () => {
    try {
      const result = await request(`/api/advert/byOwnerName/${ownerName}`, "GET", null,
        {Authorization: `Bearer ${token}`});
      setAdverts(result);
    } catch (e) {
    }
  }, [token, ownerName, request]);

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  if (loading) {
    return <LoadingPage/>;
  }
  return (
    <div>
      {!loading && <AdvertsList adverts={adverts}/>}
    </div>
  );
};