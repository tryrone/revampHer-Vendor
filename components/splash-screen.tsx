import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import styled from "styled-components/native";

import { BorderRadius, FontWeights, Spacing } from "@/constants/theme";

// Splash-specific colors from design (light blue gradient, brand blue)
const SPLASH = {
  gradientStart: "#F7FAFF",
  gradientEnd: "#E0EFFF",
  primary: "#2172EB",
  titleDark: "#333333",
  subtitleGray: "#666666",
  taglineGray: "#999999",
  dotColor: "#A9D0F5",
};

const GradientWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-horizontal: ${Spacing["2xl"]}px;
`;

const IconContainer = styled.View`
  width: 120px;
  height: 120px;
  background-color: #ffffff;
  border-radius: ${BorderRadius["2xl"]}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${Spacing["2xl"]}px;
  shadow-color: #000;
  shadow-offset: 2px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 8;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: ${Spacing.sm}px;
`;

const TitlePart = styled.Text<{ color: string }>`
  font-size: 32px;
  font-weight: ${FontWeights.bold};
  color: ${(p) => p.color};
  letter-spacing: -0.5px;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  font-weight: ${FontWeights.bold};
  color: ${SPLASH.subtitleGray};
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: ${Spacing["5xl"]}px;
`;

const DotsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Spacing["4xl"]}px;
`;

const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${SPLASH.dotColor};
  margin-horizontal: 4px;
`;

const Tagline = styled.Text`
  position: absolute;
  bottom: ${Spacing["4xl"]}px;
  font-size: 11px;
  font-weight: ${FontWeights.medium};
  color: ${SPLASH.taglineGray};
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export function SplashScreen() {
  return (
    <LinearGradient
      colors={[SPLASH.gradientStart, SPLASH.gradientEnd]}
      style={{ flex: 1 }}
    >
      <GradientWrapper>
        <Content>
          <IconContainer>
            <MaterialIcons
              name="content-cut"
              size={64}
              color={SPLASH.primary}
              style={{ opacity: 0.95 }}
            />
          </IconContainer>
          <TitleRow>
            <TitlePart color={SPLASH.titleDark}>Nure </TitlePart>
            <TitlePart color={SPLASH.primary}>Saloon</TitlePart>
          </TitleRow>
          {/* <Subtitle>Professional Studio</Subtitle> */}
          {/* <DotsRow>
            <Dot />
            <Dot />
            <Dot />
          </DotsRow> */}
        </Content>
        {/* <Tagline>Bridging Style & Business.</Tagline> */}
      </GradientWrapper>
    </LinearGradient>
  );
}
