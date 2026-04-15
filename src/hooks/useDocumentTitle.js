import { useEffect, useRef } from "react";

const useDocumentTitle = (title) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `${title} | Learning Log Dashboard`;

    return () => {
      document.title = defaultTitle.current; //この関数を呼び出していないページでデフォルト名を表示
    };
  }, [title]);
};

export default useDocumentTitle;
