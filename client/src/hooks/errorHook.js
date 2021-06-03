import {useCallback} from "react";

export const useMessage = () => {
  return useCallback((msg) => {
    if (msg) {
      alert(msg);
    }
  }, []);
};