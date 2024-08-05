// components/LottieIcon.tsx
import React from 'react';
import Lottie from 'react-lottie-player';

interface LottieIconProps {
  animationData: any;
  style?: React.CSSProperties;
  loop?: boolean;
  play: boolean;
}

const LottieIcon: React.FC<LottieIconProps> = ({ animationData, style, loop = false, play }) => {
  return (
    <Lottie
      loop={loop}
      animationData={animationData}
      play={play}
      style={style}
    />
  );
};

export default LottieIcon;
