import React from "react";
import notFoundImage  from "../../assets/images/404.webp";
import "./notfoundpage.scss";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>Page non trouvée</h1>
      <img src={notFoundImage } alt="Une bibliothèque avec beaucoup d'ouvrage sur chacune des étagères et un livre ouvert devant soi avec un encrier nous invitant à écrire un livre" />
      <p>Oops ! La page que vous recherchez n&apos;existe pas</p>
    </div>
  );
}
