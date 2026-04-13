import { useEffect, useRef } from "react";

const useDocumentTitle = (title) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `${title} | Learning Log Dashboard`;

    return () => {
      document.title = defaultTitle.current;
    };
  }, [title]);
};

export default useDocumentTitle;
