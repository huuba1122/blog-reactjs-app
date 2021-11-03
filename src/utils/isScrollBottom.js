export const isScrollBottom = () => {
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
    
    return (windowBottom >= docHeight - 200) ? true : false;
}
 