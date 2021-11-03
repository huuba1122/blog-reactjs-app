import { useEffect, useState } from "react";

function usePagination(total) {
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    const handleScroll = () => {
      const html = document.documentElement;
      const body = document.body;
      const windowHeight = window.innerHeight || html.offsetHeight;

      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight - 200 && limit < total) {
        console.log("limit>>.",limit);
        setLimit(limit + 10) ;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limit,total]);

  return limit;
}

export default usePagination;
