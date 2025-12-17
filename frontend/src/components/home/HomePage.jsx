import React, { useEffect, useRef } from 'react'
import FashionBanner from './Banner';
import MeetShilpaBanner from './MeetShilpaBanner';
import CategoryProductView from '../product/CategoryProductView';
import { randomValue } from '../../GenerateCardCode';

const HomePage = () => {
  const categoryRef = useRef(null); // Step 1: create a ref

  useEffect(() => {
    if (localStorage.getItem("cart_code") === null) {
      localStorage.setItem("cart_code", randomValue)
    }
  }, []);

  return (
    <>
      <FashionBanner scrollToCategory={() => {
        categoryRef.current?.scrollIntoView({ behavior: "smooth" });
      }} />
      <MeetShilpaBanner />
      <div ref={categoryRef}> {/* Step 2: add ref to target section */}
        <CategoryProductView />
      </div>
    </>
  );
};

export default HomePage;
