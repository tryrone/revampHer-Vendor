import Toast from "react-native-toast-message";

type ToastProps = {
  title?: string;
  text?: string;
  subTitle?: string;
  actionBtnLabel?: string;
  action?: () => void;
  position?: "top" | "bottom";
  duration?: number;
  type?: "info" | "error" | "success" | "action" | "notification";
  textColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
};

const showToast = ({
  title,
  text,
  subTitle,
  actionBtnLabel,
  action,
  position = "top",
  duration = 3000,
  type = "info",
  textColor,
  backgroundColor,
  onPress,
}: ToastProps) => {
  Toast.show({
    text1: title,
    text2: text,
    visibilityTime: duration,
    onPress: () => {
      Toast.hide();
      onPress?.();
    },
    type: type === "action" ? "withActionButton" : type,
    position,
    props: {
      subTitle,
      textColor,
      backgroundColor,
      buttonText: actionBtnLabel,
      onButtonPress: () => {
        action?.();
        Toast.hide();
      },
    },
  });
};

const hideToast = () => Toast.hide();

export { showToast, hideToast };
