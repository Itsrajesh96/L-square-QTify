
import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({
  title = "Top Albums",
  endpoint = "https://qtify-backend.labs.crio.do/albums/top",
  showToggle = true,
  customLayout = false,
  children,
}) {
  const [albums, setAlbums] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (customLayout) return;

    let active = true;

    async function fetchAlbums() {
      try {
        const response = await axios.get(endpoint);
        const albumData = Array.isArray(response.data)
          ? response.data
          : response.data?.data ?? [];

        if (active) {
          setAlbums(albumData);
          setError(false);
        }
      } catch (err) {
        if (active) {
          setError(true);
          console.error(`Failed to fetch ${title}:`, err);
        }
      }
    }

    fetchAlbums();

    return () => {
      active = false;
    };
  }, [endpoint, title, customLayout]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>

        {!customLayout && showToggle && albums.length > 4 && (
          <button
            className={styles.toggleButton}
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
          >
            {expanded ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {error && (
        <p role="alert">
          Unable to load albums. Please try again.
        </p>
      )}

      {customLayout ? (
        children
      ) : expanded ? (
        <div className={styles.albumGrid}>
          {albums.map((album) => (
            <Card key={album.id} album={album} />
          ))}
        </div>
      ) : (
        <Carousel data={albums} />
      )}
    </section>
  );
}

export default Section;
