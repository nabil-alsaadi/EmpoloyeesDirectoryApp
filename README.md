# Employee Directory App

## Overview

This is a simple React Native application that displays a list of employees fetched from a REST API and allows users to view employee details and search/filter employees by various attributes.

## Features

- Display a list of employees fetched from https://dummy.restapiexample.com/api/v1/employees.
- Allow searching and filtering employees by name, age, and salary.
- Show details of selected employee.
- Handle errors and allow retrying failed requests.
- Implement pull-to-refresh for updating employee list data.
- Implement add, edit, delete employee functionalities.
  
## Technologies Used
- React Native
- Redux
- Redux Observable
- Redux Persist
- Axios for API requests

### Performance Optimization

- **Caching**: Redux is used to store fetched employee data locally, minimizing API calls by storing and updating data in the application state.
- **Memoization**: React's `useMemo` and `useCallback` hooks are utilized to memoize data, improving rendering performance by avoiding unnecessary re-renders.
- **Redux Persist**: Used for persisting Redux state across app restarts, enhancing performance by caching data locally.

## Demo
[Watch the video demo](./employee_demo.mov)

## Setup Instructions

To run this app locally on your machine, follow these steps:

### Prerequisites

- Node.js and npm installed globally on your machine.
- Expo CLI or React Native CLI installed globally (depending on your project setup).

### Installation

## Step 1: Clone the repository from GitHub:
   ```bash
   git clone https://github.com/nabil-alsaadi/EmpoloyeesDirectoryApp.git
   
   cd EmployeeDirectoryApp
   ```
## Step 2: Install dependencies:
   ```bash
   npm install
   ```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

```

## Step 4: Start your Application

Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

## Contributors

- [Nabil Alsaadi](https://github.com/nabil-alsaadi) - Developer

## License

This project is licensed under the MIT License.
