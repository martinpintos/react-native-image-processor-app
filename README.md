# React Native Image Processor App

This is a React Native application that allows users to process and manipulate images using various transformations and adjustments. The app utilizes the power of the Expo framework and leverages the `expo-router` library for native navigation.

## Features

- Select an image from a list ofimages
- Apply rotation and flip transformations to the selected image
- Adjust orientation and rotation using sliders
- View the history of applied transformations
- Revert to a previous state in the transformation history
- Copy the transformed image URL to the clipboard
- Download the image
- Responsive design for optimal viewing experience on different devices

## Technologies Used

- React Native: A framework for building native mobile apps using React
- Expo: A platform for building and deploying universal React apps
- Expo Router: A library for building native navigation using files in the `app/` directory
- Zustand: A small, fast, and scalable state management solution
- React Native Community Slider: A pure JavaScript `<Slider>` component for react-native
- Gorhom Bottom Sheet: A highly customizable bottom sheet component for React Native
- Expo Image: A component for displaying images in Expo apps
- Expo Clipboard: Provides an interface for getting and setting Clipboard content

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js
- Expo CLI

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/martinpintos/react-native-image-processor.git
```

2.Navigate to the project directory:

```sh
cd react-native-image-processor
```

3.Install the dependencies:

```sh
npm install
```

4.Configure the API URL:

Create a .env file in the root directory of the project and add the following line:

```sh
EXPO_PUBLIC_API_URL=your-api-url
```

Replace your-api-url with the actual URL of your API.

5.Start the development server:

```sh
npx expo start
```

6.Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal or the Expo Developer Tools in your browser.

## Folder Structure

- `app/`: Contains the main application files and routes
  - `(tabs)/index.tsx`: The main gallery screen component
  - `(tabs)/settings.tsx`: The settings screen component
  - `edit/[url].tsx`: The screen component for editing a selected image
- `components/`: Contains shared components used throughout the app
  - `Edit/`: Components specific to the edit screen
  - `common/`: Common components used in multiple screens
- `store/`: Contains the Zustand store and hooks
