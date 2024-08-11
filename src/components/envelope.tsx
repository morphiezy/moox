"use client";

import Lottie, { Options } from "react-lottie";
import animationData from "@/data/envelope.json";

export function Envelope() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  } as Options;

  return <Lottie options={defaultOptions} />;
}
