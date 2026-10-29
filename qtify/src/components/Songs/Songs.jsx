
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Section from "../Section/Section";
import Carousel from "../Carousel/Carousel";
import Card from "../Card/Card";
import styles from "./Songs.module.css";

const SONGS_URL = "https://qtify-backend.labs.crio.do/songs";
const GENRES_URL = "https://qtify-backend.labs.crio.do/genres";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const [songsResponse, genresResponse] = await Promise.all([
          axios.get(SONGS_URL),
          axios.get(GENRES_URL),
        ]);

        const songsData = Array.isArray(songsResponse.data)
          ? songsResponse.data
          : songsResponse.data?.data ?? [];

        const genresData = Array.isArray(genresResponse.data)
          ? genresResponse.data
          : genresResponse.data?.data ?? [];

        if (active) {
          setSongs(songsData);
          setGenres(genresData);
          setError(false);
        }
      } catch (err) {
        if (active) {
          setError(true);
          console.error("Failed to fetch songs or genres:", err);
        }
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const visibleSongs = useMemo(() => {
    if (selectedGenre === "all") return songs;

    return songs.filter(
      (song) => song.genre?.key === selectedGenre
    );
  }, [songs, selectedGenre]);

  const tabs = [
    { key: "all", label: "All" },
    ...genres
      .filter((genre) =>
        ["rock", "pop", "jazz", "blues"].includes(
          genre.key?.toLowerCase()
        )
      )
      .map((genre) => ({
        key: genre.key.toLowerCase(),
        label: genre.label,
      })),
  ];

  return (
    <Section
      title="Songs"
      showToggle={false}
      customLayout
    >
      <div className={styles.songsContent}>
        <Tabs
          value={selectedGenre}
          onChange={(_, newValue) => setSelectedGenre(newValue)}
          aria-label="Filter songs by genre"
          className={styles.tabs}
          variant="scrollable"
          scrollButtons={false}
        >
          {tabs.map((genre) => (
            <Tab
              key={genre.key}
              value={genre.key}
              label={genre.label}
              className={styles.tab}
            />
          ))}
        </Tabs>

        {error && (
          <p role="alert">
            Unable to load songs. Please try again.
          </p>
        )}

        <Carousel
          data={visibleSongs}
          renderComponent={(song) => (
            <Card album={song} type="song" />
          )}
        />
      </div>
    </Section>
  );
}

export default Songs;
