
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Songs.module.css";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchSongs() {
      try {
        const response = await axios.get(
          "https://qtify-backend.labs.crio.do/songs"
        );

        if (active) {
          const data = Array.isArray(response.data)
            ? response.data
            : response.data?.data ?? [];

          setSongs(data);
          setError(false);
        }
      } catch (err) {
        if (active) {
          setError(true);
          console.error("Failed to fetch songs:", err);
        }
      }
    }

    fetchSongs();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={styles.section}>
      <h2>Songs</h2>

      {error && <p role="alert">Unable to load songs.</p>}

      <div className={styles.songGrid}>
        {songs.map((song) => (
          <article className={styles.songCard} key={song.id}>
            <img
              src={song.image}
              alt={song.title}
            />
            <h3>{song.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Songs;
