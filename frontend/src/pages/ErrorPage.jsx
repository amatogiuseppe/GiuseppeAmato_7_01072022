import React from "react";

function ErrorPage() {
  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <h2 className="error-page__minor-title">Not Found</h2>
      <div className="error-page__description">
        Nous ne trouvons pas la page que vous recherchez. <br />
        Vérifiez que l'URL que vous avez saisie ne contient pas d'erreur.
      </div>
    </div>
  );
}

export default ErrorPage;
