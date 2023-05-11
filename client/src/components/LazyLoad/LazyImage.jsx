import React, { Suspense, lazy } from "react";
import Skeleton from "../../skeleton/Skeleton";

const ActiveImage = lazy(() => import("./ActiveImage"));

const LazyImage = ({src, alt, classname, loader}) => {

  return (
    <Suspense fallback={<Skeleton type={loader} />}>
      <ActiveImage src={src} alt={alt} classname={classname} />
    </Suspense>
  )
}

export default LazyImage;