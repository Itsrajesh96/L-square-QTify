
import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ album, type = "album" }) {
  if (!album) return null;

  const isSong = type === "song";
  const count = isSong ? album.likes : album.follows;
  const label = isSong ? "Likes" : "Follows";

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.albumImage}
          src={album.image}
          alt={album.title}
        />
      </div>

      <div className={styles.cardContent}>
        <Chip
          className={styles.followChip}
          label={`${count ?? 0} ${label}`}
          size="small"
        />

        <p className={styles.albumTitle}>{album.title}</p>
      </div>
    </article>
  );
}

export default Card;
