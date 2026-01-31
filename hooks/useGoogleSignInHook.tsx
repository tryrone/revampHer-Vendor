import { useState } from "react";

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  photo: string | null;
}

const useGoogleSignInHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [googleSignInToken, setGoogleSignInToken] = useState<string | null>(
    null
  );

  const googlePromptAsync = async () => {
    try {
      // Dynamically import to avoid errors if native module isn't available
      const {
        GoogleSignin,
        isSuccessResponse,
        isErrorWithCode,
        statusCodes,
      } = await import("@react-native-google-signin/google-signin");

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;

        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        };
        setUser(userData);
        const token = idToken;
        setGoogleSignInToken(token);
      } else {
        console.log("Sign in Cancelled");
      }
    } catch (error: any) {
      console.log("Error", error);
      
      // Check if it's a module not found error
      if (
        error?.message?.includes("TurboModuleRegistry") ||
        error?.message?.includes("RNGoogleSignin") ||
        error?.message?.includes("could not be found")
      ) {
        const errorMessage =
          "Google Sign-In native module not found. Please rebuild your app:\n" +
          "1. Stop the current development server\n" +
          "2. For Expo: Create a development build with 'npx expo run:ios' or 'npx expo run:android'\n" +
          "3. Note: Google Sign-In requires a development build (not Expo Go)";
        console.error(errorMessage);
        throw new Error("Google Sign-In is not available. Please rebuild the app.");
      }

      // Try to handle Google Sign-In specific error codes
      try {
        const { isErrorWithCode, statusCodes } = await import(
          "@react-native-google-signin/google-signin"
        );
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              console.log("Sign in cancelled");
              return; // Don't throw, just return
            case statusCodes.IN_PROGRESS:
              console.log("Sign in in progress");
              return;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              console.log("Play services not available");
              throw error;
            case statusCodes.SIGN_IN_REQUIRED:
              console.log("Sign in required");
              throw error;
            default:
              throw error;
          }
        } else {
          throw error;
        }
      } catch (importError) {
        // If we can't import the module for error checking, throw the original error
        throw error;
      }
    }
  };

  return { user, googleSignInToken, googlePromptAsync };
};

export default useGoogleSignInHook;
