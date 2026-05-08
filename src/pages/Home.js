import React, { lazy, Suspense } from "react";

// Lazy load heavy component
const YearSelection = lazy(() => import("./YearSelection"));

const Home = () => {
  return (
    <div className="container">
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            Loading subjects...
          </div>
          
        }
      >
        <YearSelection />
        
      </Suspense>
    </div>
  );
};

export default Home;