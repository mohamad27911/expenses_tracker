# 💰 Expenses Tracker

An intuitive and sleek expenses tracking web app built using **React**, **TypeScript**, **Firebase**, and **Material UI/Tailwind CSS**. Track your income, expenses, and savings with ease across all your devices!

## 📚 Features

- **Track Income & Expenses**: Easily log your income and expenses in a simple-to-use interface.
- **Remaining Balance**: View your remaining balance in real-time to stay on top of your budget.
- **Savings Goals**: Track and set savings goals to keep yourself financially organized.
- **Responsive Design**: Fully responsive, ensuring optimal experience on both desktop and mobile.
- **User Authentication**:
  - **Firebase Auth** for secure sign-in and sign-up.
  - **Error Handling** for incorrect credentials or user-related issues.
- **Firebase Integration**:
  - Real-time database for consistent data syncing across devices.
  - Secure hosting through Firebase Hosting.

## 🛠️ Tech Stack

- **React**: Front-end JavaScript library for building dynamic user interfaces.
- **TypeScript**: Ensures type safety and improves code maintainability.
- **Firebase**: Used for authentication, database management, and hosting.
- **Material UI & Tailwind CSS**: For building a modern and responsive user interface.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or above)
- **npm** or **yarn**
- **Firebase CLI**

### Installation

1. Clone the repository:

    ```bash
    git clone  https://github.com/mohamad27911/expenses_tracker.git
    cd expenses-tracker
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Firebase:

    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - In your Firebase project settings, create a `.env` file with your Firebase API keys.

    ```bash
    REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Build for production:

    ```bash
    npm run build
    ```

## 🔗 Links

- **Live Project**: [Expences Tracker]( https://expenses-tracker-c8997.web.app
)


## 🤝 Contributing

Pull requests are welcome! If you find any issues, please open an issue or submit a PR.

## 📝 License

This project is licensed under the MIT License.
[MIT](https://choosealicense.com/licenses/mit/)