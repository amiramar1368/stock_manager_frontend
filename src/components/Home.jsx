import { lazy, Suspense } from "react";

const BarChart = lazy(() => import("./chart/BarChart"));

function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-100 h-75 d-flex justify-content-center align-items-center">
          <i className="spinner spinner-border"></i>
        </div>
      }
    >
      <BarChart />
    </Suspense>
  );
}

export default Home;
