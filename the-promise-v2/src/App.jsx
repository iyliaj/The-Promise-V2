import './App.css'
import { Routes, Route } from "react-router"
import { MainPage } from './MainPage'
import { RatingsPage } from './RatingsPage'
import { getItem, setItem } from './utils/localStorage'
import { useState, useEffect } from 'react'
import { SettingsPage } from './SettingsPage'

function App() {

  // Initialise user data
  const [userData, setUserData] = useState(() => {

    const storedData = getItem("userData");

    // If we have stored data, use it directly without reprocessing
    if (storedData) {
      return storedData;
    }

    // Only process expiration logic for fresh/default data
    const initialData = {
      promises: [
        {
          id: 1,
          title: "Cook Pizza",
          description: "Finish cooking Napolitana Pizza",
          date: "2026-02-10",
          time: "22:53",
          status: "active"
        },
        {
          id: 2,
          title: "Run like a bitch",
          description: "Burn some calories",
          date: "2026-02-10",
          time: "23:00",
          status: "active"
        }
      ],
      ratings: {
        userScore: "",
        promisesStatus: {
          expiredPromises: [],
          completedPromises: []
        }
      },
      settings: {
        theme: "light",
        font: "Inter",
        textSize: "",
        sound: "on"
      }
    }

    const now = new Date();
    const expired = [];
    const active = [];

    initialData.promises.forEach(promise => {
      const dateTime = new Date(`${promise.date}T${promise.time}`);
      const timeLeft = dateTime.getTime() - now.getTime();

      if (timeLeft <= 0) {
        expired.push({ ...promise, status: "expired" });
      } else {
        active.push(promise);
      }

    });

    active.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);

      return dateTimeA.getTime() - dateTimeB.getTime();
    });

    expired.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);

      return dateTimeA.getTime() - dateTimeB.getTime();
    });

    return {
      ...initialData,
      promises: active,
      ratings: {
        ...initialData.ratings,
        promisesStatus: {
          ...initialData.ratings.promisesStatus,
          expiredPromises: expired
        }
      }
    }

  });

  // Track changes for Dark/ Light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {

    // Retrieve full data from saved key
    const savedData = userData;
    console.log('Initial userData in SettingsPage:', savedData);
    // Return 
    const savedTheme = savedData?.settings?.theme;
    console.log('Initial saved theme:', savedTheme);

    // Load "light" as default if none saved
    return savedTheme || "light";

  });

  // Track changes for font settings
  const [fontType, setFontType] = useState(() => {

    const savedData = userData;

    const savedFont = savedData?.settings?.font;

    return savedFont || "Inter";
  });

  // Persist userData to localStorage whenever it changes
  useEffect(() => {
    setItem("userData", userData);
  }, [userData]);


  return (
    <div className={`${fontType === "Inter" && "inter-400"} ${fontType === "Roboto" && "roboto-200"} ${fontType === "Lato" && "lato-regular"}`}>
      <Routes>
        <Route path="" element={<MainPage userData={userData} setUserData={setUserData} isDarkMode={isDarkMode} />} />
        <Route path="/ratings" element={<RatingsPage userData={userData} isDarkMode={isDarkMode} />} />
        <Route path="/settings" element={<SettingsPage userData={userData} setUserData={setUserData} fontType={fontType} setFontType={setFontType} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </div>

  )
}

export default App
