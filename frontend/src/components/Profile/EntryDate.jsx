import React from "react";

function EntryDate({ userData }) {

  // Function to set the format of the entry date
  function setDateFormat(date) {
    let timeSetting = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date)
      .toLocaleDateString("fr-FR", timeSetting)
      .toUpperCase();
  }

  return (
    <div id="entry-date">
      <b>Membre depuis :</b> <br /> {setDateFormat(userData.createdAt)}
    </div>
  );
}

export default EntryDate;
