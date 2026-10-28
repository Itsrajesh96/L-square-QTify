
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Card from "../Card/Card";
import styles from "./Carousel.module.css";

function Carousel({ data = [], renderComponent }) {
  const renderItem =
    renderComponent || ((item) => <Card album={item} />);

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className={styles.carousel}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id || item.title}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
