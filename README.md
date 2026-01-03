# RevampHer Vendor App

A modern React Native mobile application built with Expo for service vendors on the RevampHer platform. This app enables vendors to manage orders, track earnings, view transaction history, and maintain their availability status.

## 📱 Features

### Authentication & Onboarding

- **Login** - Secure vendor authentication
- **Account Creation** - New vendor registration
- **OTP Verification** - Phone number verification
- **Onboarding** - Guided setup for new vendors
- **Profile Setup** - Complete vendor profile configuration

### Core Functionality

- **Home Dashboard** - View and manage incoming orders/requests
- **Order Management** - Detailed order information and processing
- **Earnings Tracking** - Monitor revenue and financial performance
- **Transaction History** - Complete record of past transactions
- **Notifications** - Real-time updates and alerts
- **Availability Toggle** - Control when you're available to accept orders
- **Profile Management** - Update vendor information and settings

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0.30
- **Runtime**: React Native 0.81.5
- **Language**: TypeScript ~5.9.2
- **Navigation**: Expo Router ~6.0.21 (file-based routing)
- **Styling**: Styled Components ^6.1.13
- **UI Components**:
  - @expo/vector-icons
  - React Navigation
  - Custom themed components

### Key Dependencies

- `expo-router` - File-based routing system
- `react-native-gesture-handler` - Gesture handling
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe area handling
- `expo-haptics` - Haptic feedback
- `expo-image` - Optimized image component
- `expo-clipboard` - Clipboard functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Yarn package manager (v1.22.22+)
- Expo CLI (installed globally or via npx)
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd RevampHer-Vendor
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   yarn start
   ```

   or

   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - **iOS Simulator**: Press `i` in the terminal or run `yarn ios`
   - **Android Emulator**: Press `a` in the terminal or run `yarn android`
   - **Web**: Press `w` in the terminal or run `yarn web`
   - **Expo Go**: Scan the QR code with the Expo Go app on your device

## 📁 Project Structure

```
RevampHer-Vendor/
├── app/                    # Main application screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home/Dashboard
│   │   ├── earnings.tsx   # Earnings screen
│   │   ├── history.tsx    # Transaction history
│   │   └── profile.tsx    # Profile management
│   ├── login.tsx          # Login screen
│   ├── create-account.tsx # Registration
│   ├── otp-verification.tsx
│   ├── onboarding.tsx
│   ├── profile-setup.tsx
│   ├── order-details.tsx
│   ├── notifications.tsx
│   ├── availability-toggle.tsx
│   └── transaction-details.tsx
├── components/            # Reusable UI components
│   └── ui/               # UI component library
├── constants/            # App constants and theme
│   ├── Colors.ts
│   └── theme.ts
├── hooks/                # Custom React hooks
├── assets/               # Images, icons, and static assets
└── scripts/              # Utility scripts
```

## 🎨 Theming

The app supports both light and dark modes with a comprehensive theming system:

- **Primary Color**: `#308ce8` (Blue)
- **Dark Mode**: Automatic based on system preferences
- **Customizable**: Theme constants defined in `constants/theme.ts`

## 📝 Available Scripts

- `yarn start` - Start the Expo development server
- `yarn android` - Run on Android emulator/device
- `yarn ios` - Run on iOS simulator/device
- `yarn web` - Run in web browser
- `yarn lint` - Run ESLint
- `yarn reset-project` - Reset to a blank project template

## 🔧 Configuration

### App Configuration

The app configuration is managed in `app.json`:

- App name: RevampHer-Vendor
- Scheme: `revamphervendor`
- New Architecture: Enabled
- Typed Routes: Enabled
- React Compiler: Enabled

### Environment Setup

Make sure to configure any required environment variables or API endpoints as needed for your deployment.

## 🏗️ Architecture

- **File-based Routing**: Uses Expo Router for navigation
- **Component-based**: Modular React components
- **Type-safe**: Full TypeScript support
- **Styled Components**: CSS-in-JS styling approach
- **Safe Areas**: Proper handling of device safe areas

## 📱 Platform Support

- ✅ iOS (with tablet support)
- ✅ Android (with edge-to-edge enabled)
- ✅ Web (static output)

## 🔐 Security

- Secure authentication flow
- OTP verification for phone numbers
- Safe handling of sensitive data

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test on iOS, Android, and Web
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For issues, questions, or contributions, please contact the development team.

---

Built with ❤️ using Expo and React Native
