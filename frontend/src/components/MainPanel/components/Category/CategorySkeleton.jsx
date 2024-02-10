import React from "react";
import { Skeleton } from "@mui/material";

const CategorySkeleton = () => {
  const skeletonCards = Array.from({ length: 7 }, (_, index) => (
    <Skeleton
      key={index}
      variant="rectangular"
      width={190}
      height={180}
    />
  ));

  return (
    <div className="category">
      <div className="category-name">
        <Skeleton height={48} />
      </div>
      <div className="items">{skeletonCards}</div>
    </div>
  );
};

export default CategorySkeleton;
