"use client";
import React from "react";
import DynamicRendering from "@/components/common/ListingRendering";
import ProfileRendaring from "@/components/common/ProfileRendaring";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page = () => {
  const compliance = useSelector(
    (state: RootState) => state.displaySlice.compliance,
  );

  // console.log("Compliance value:", compliance);

  return <>{compliance ? <ProfileRendaring /> : <DynamicRendering />}</>;
};

export default Page;
