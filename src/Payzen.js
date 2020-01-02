export default {
  async loadScript(source, urlClientJs) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      const prior = document.getElementsByTagName("script")[0];

      if (urlClientJs) {
        script.setAttribute("kr-public-key", urlClientJs);
        script.setAttribute("kr-post-url-success", "");
      }

      function onloadHandler(_, isAbort) {
        if (
          isAbort ||
          !script.readyState ||
          /loaded|complete/.test(script.readyState)
        ) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;

          if (isAbort) {
            reject();
          } else {
            resolve();
          }
        }
      }

      script.onload = onloadHandler;
      script.onreadystatechange = onloadHandler;

      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    });
  }
};
