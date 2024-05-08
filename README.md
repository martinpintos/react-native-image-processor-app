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

## Design Decisions

Design Decisions

1. Expo Framework: The app is built using the Expo framework, which provides a set of tools and services for building, deploying, and quickly iterating on React Native apps. Expo simplifies the development process by providing a managed workflow and a set of pre-built components and APIs.

2. Expo Router: The app utilizes the expo-router library for handling navigation. Expo Router allows for file-based routing, where each file in the app/ directory corresponds to a route in the app. This approach simplifies navigation configuration and provides a more intuitive way to structure the app's screens and routes.

3. Zustand for State Management: The app uses the Zustand library for state management. Zustand is a lightweight and easy-to-use state management solution that provides a simple and efficient way to manage the app's state. It allows for creating a centralized store and accessing state across components without the need for complex boilerplate code.

4. Reusable Components: The app is structured using reusable components to ensure a modular and maintainable codebase. Components are organized into two main categories: Edit/ for components specific to the edit screen and common/ for components used throughout the app. This separation enhances code organization and promotes component reusability.

5. Expo Libraries for Enhanced Functionality: Several Expo libraries are utilized to provide additional functionality to the app. These include expo-image for optimized image rendering, expo-file-system and expo-media-library for image downloading and saving and expo-clipboard for copying data to the clipboard.

## Architecture

The architecture of the React Native Image Processor App follows a component-based and modular approach, harnessing the power of React Native and Expo. The app is structured into different layers and components to ensure separation of concerns and maintainability.
