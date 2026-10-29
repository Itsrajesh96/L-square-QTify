
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Card from "../Card/Card";
import LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation";
import styles from "./Carousel.module.css";

function Carousel({ data = [], renderComponent }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const renderItem =
    renderComponent || ((item) => <Card album={item} />);

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={styles.carousel}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavigation(swiper);
        }}
        onSlideChange={updateNavigation}
        onResize={updateNavigation}
        onReachBeginning={updateNavigation}
        onReachEnd={updateNavigation}
        onUpdate={updateNavigation}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id || item.title || index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {!isBeginning && (
        <LeftNavigation
          onClick={() => swiperRef.current?.slidePrev()}
        />
      )}

      {!isEnd && data.length > 0 && (
        <RightNavigation
          onClick={() => swiperRef.current?.slideNext()}
        />
      )}
    </div>
  );
}

export default Carousel;
