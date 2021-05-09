// importing react-animations
import { slideInRight, slideOutRight, fadeInUp } from "react-animations";
import Radium from "radium";

export const animationStyles = {
  fadeInUpSlow: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  slideInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideInRight, "slideInRight"),
  },
  slideOutRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideOutRight, "slideOutRight"),
  },
  fadeInUpFast: {
    animation: "x 0.3s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
};
