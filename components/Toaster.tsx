import { ThemedText as Text } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import { Spacing } from "@/constants/theme";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Toast, { ToastShowParams } from "react-native-toast-message";
import styled from "styled-components/native";

const Wrapper = styled.Pressable<{ bg: string }>`
  width: 95%;
  min-width: 50%;
  background: ${({ bg }) => bg};
  margin-top: ${verticalScale(14)}px;
  margin-bottom: ${verticalScale(24)}px;
  border-radius: ${moderateScale(10)}px;
  min-height: ${verticalScale(30)}px;
  padding-vertical: ${Spacing.x4}px;
  padding-horizontal: ${Spacing.x3}px;
`;

const NotificationWrapper = styled.View`
  padding: 10px;
`;

const FlexWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextWrapper = styled.View`
  flex: 1;
`;

const ActionButton = styled.Pressable`
  margin-left: 10px;
`;

const Toaster = () => {
  const toastConfig = {
    success: ({ text1, text2, onPress }: ToastShowParams) => (
      <Wrapper onPress={onPress} bg={Colors.green[500]}>
        {text1 && (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{text1}</Text>
        )}
        {text2 && (
          <Text style={{ color: "#fff", fontWeight: "normal" }}>{text2}</Text>
        )}
      </Wrapper>
    ),

    error: ({ text1, text2, onPress }: ToastShowParams) => (
      <Wrapper onPress={onPress} bg={Colors.red[500]}>
        {text1 && (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{text1}</Text>
        )}
        {text2 && (
          <Text style={{ color: "#fff", fontWeight: "normal" }}>{text2}</Text>
        )}
      </Wrapper>
    ),

    info: ({ text1, text2, props, onPress }: ToastShowParams) => (
      <Wrapper onPress={onPress} bg={props.backgroundColor || "#fff"}>
        {text1 && (
          <Text
            style={{ color: props.textColor || "#fff", fontWeight: "bold" }}
          >
            {text1}
          </Text>
        )}
        {text2 && (
          <Text
            style={{ color: props.textColor || "#fff", fontWeight: "normal" }}
          >
            {text2}
          </Text>
        )}
      </Wrapper>
    ),

    withActionButton: ({ text1, text2, props }: ToastShowParams) => (
      <Wrapper bg={props.backgroundColor || "#fff"}>
        <FlexWrapper>
          <TextWrapper>
            {text1 && (
              <Text
                style={{
                  color: props.textColor || "#0A0A10",
                  fontWeight: "bold",
                }}
              >
                {text1}
              </Text>
            )}
            {text2 && (
              <Text
                style={{
                  color: props.textColor || "#0A0A10",
                  fontWeight: "normal",
                }}
              >
                {text2}
              </Text>
            )}
          </TextWrapper>
          <ActionButton onPress={props.onButtonPress}>
            <Text
              style={{ color: props.textColor || "#0A0A10", fontWeight: "600" }}
            >
              {props.buttonText}
            </Text>
          </ActionButton>
        </FlexWrapper>
      </Wrapper>
    ),

    notification: ({ text1, text2, props, onPress }: ToastShowParams) => (
      <Wrapper onPress={onPress} bg={"#151415"}>
        <NotificationWrapper>
          {text1 && (
            <Text style={{ color: Colors.light.text, fontWeight: "normal" }}>
              {text1}
            </Text>
          )}
          {props.subTitle && (
            <Text
              style={{
                color: Colors.light.text,
                fontWeight: "normal",
                marginBottom: Spacing.x2,
              }}
            >
              {props.subTitle}
            </Text>
          )}
          {text2 && (
            <Text style={{ color: Colors.light.text, fontWeight: "normal" }}>
              {text2}
            </Text>
          )}
        </NotificationWrapper>
      </Wrapper>
    ),
  };

  return <Toast config={toastConfig} />;
};

export default Toaster;
