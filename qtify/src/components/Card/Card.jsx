
import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ album }) {
  if (!album) return null;

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
          label={`${album.follows ?? 0} Follows`}
          size="small"
        />
        <p className={styles.albumTitle}>{album.title}</p>
      </div>
    </article>
  );
}

export default Card;
