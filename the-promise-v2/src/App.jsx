import './App.css'
import { Routes, Route } from "react-router"
import { MainPage } from './MainPage'
import { RatingsPage } from './RatingsPage'
import { getItem, setItem } from './utils/localStorage'
import { useState, useEffect, useRef } from 'react'
import { SettingsPage } from './SettingsPage'
import clickPop from "./assets/Sounds/ui-click-navigate-up-roy-s-noise-1-00-00.mp3";
import clickReject from "./assets/Sounds/futuristic-ui-negative-selection-davies-aguirre-1-00-00.mp3";
import submitSuccess from "./assets/Sounds/futuristic-ui-positive-selection-davies-aguirre-2-2-00-00.mp3";
import expiryAlarm from "./assets/Sounds/ui-alarm-alert-bells-ra-music-1-00-02.mp3";
import promiseCompleted from "./assets/Sounds/arcade-game-victory-chime-epic-stock-media-1-00-01.mp3";

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
          title: "Welcome to The Promise",
          description: "The Promise is a timed to-do list app for personal development",
          date: "2026-03-10",
          time: "22:53",
          status: "active"
        },
        {
          id: 2,
          title: "Operates 100% based on your honesty, for now",
          description: "Further development is in the works",
          date: "2026-03-12",
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

    // Get today's date and prepare new arrays to assign active and expired promises to
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

    // Sort data in each new array according to time
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

    // Return the sorted data
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

  // Apply saved theme to <html> class synchronously before first render
  useState(() => {
    const savedTheme = userData?.settings?.theme;
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  // Track changes for font settings
  const [fontType, setFontType] = useState(() => {

    const savedData = userData;

    const savedFont = savedData?.settings?.font;

    // Inter is the default font if none was previously saved
    return savedFont || "Inter";
  });


  // To track sound on and off
  const [isSoundOn, setIsSoundOn] = useState(() => {

    const soundMode = userData?.settings?.sound;

    let saved;

    if (soundMode === "on") {
      saved = true;
    } else if (soundMode === "off") {
      saved = false;
    }

    // Return previous saved sound setting or default to 
    return saved || false;
  });

  // AUDIO

  // Pop Sound for standard clicks
  const clickPopRef = useRef(null);

  const playPopSound = (volume = 0.5) => {
    if (!clickPopRef.current) {
      clickPopRef.current = new Audio(clickPop);
    }

    clickPopRef.current.volume = volume;
    clickPopRef.current.play();
  }

  // Reject sound for rejected clicks
  const clickRejectRef = useRef(null);

  const playRejectSound = (volume = 0.8) => {
    if (!clickRejectRef.current) {
      clickRejectRef.current = new Audio(clickReject);
    }

    clickRejectRef.current.volume = volume;
    clickRejectRef.current.play();
  }

  // Successful submit sound
  const successfulSubmit = useRef(null);

  const playSuccessfulSubmit = (volume = 0.5) => {
    if (!successfulSubmit.current) {
      successfulSubmit.current = new Audio(submitSuccess);
    }

    successfulSubmit.current.volume = volume;
    successfulSubmit.current.play();
  }

  const expiredPromise = useRef(null);

  const playExpiryAlarm = (volume = 0.5) => {
    if (!expiredPromise.current) {
      expiredPromise.current = new Audio(expiryAlarm);
    }

    expiredPromise.current.volume = volume;
    expiredPromise.current.play();
  }

  const completePromise = useRef(null);

  const playCompletedPromise = (volume = 0.5) => {
    if (!completePromise.current) {
      completePromise.current = new Audio(promiseCompleted);
    }

    completePromise.current.volume = volume;
    completePromise.current.play();
  }

  // Persist userData to localStorage whenever it changes
  useEffect(() => {
    setItem("userData", userData);
  }, [userData]);

  const [isDefaultFontSize, setIsDefaultFontSize] = useState(() => {

    const savedTextSize = userData?.settings?.textSize;

    if (savedTextSize === "default") {

      // Change size
      const root = document.documentElement;
      root.style.setProperty("--textXSmall", "0.7rem");
      root.style.setProperty("--textSmall", "0.8rem");
      root.style.setProperty("--textMedium", "1rem");
      root.style.setProperty("--textLarge", "1.2rem");
      root.style.setProperty("--textXLarge", "1.5rem");

      return true;
    }

    if (savedTextSize === "larger") {

      // Change Size
      const root = document.documentElement;
      root.style.setProperty("--textXSmall", "0.8rem");
      root.style.setProperty("--textSmall", "0.9rem");
      root.style.setProperty("--textMedium", "1.1rem");
      root.style.setProperty("--textLarge", "1.3rem");
      root.style.setProperty("--textXLarge", "1.6rem");

      return false;
    }

    return true;
  });

  return (
    <div className={
      `${fontType === "Inter" && "inter-400"} 
      ${fontType === "Roboto" && "roboto-200"} 
      ${fontType === "Lato" && "lato-regular"}`
    }>
      <Routes>
        <Route
          path=""
          element={
            <MainPage
              userData={userData}
              setUserData={setUserData}
              playPopSound={playPopSound}
              isSoundOn={isSoundOn}
              playRejectSound={playRejectSound}
              playSuccessfulSubmit={playSuccessfulSubmit}
              playExpiryAlarm={playExpiryAlarm}
              playCompletedPromise={playCompletedPromise}
              fontType={fontType}
              setFontType={setFontType}
              setIsSoundOn={setIsSoundOn}
              isDefaultFontSize={isDefaultFontSize}
              setIsDefaultFontSize={setIsDefaultFontSize}
            />}
        />
        <Route
          path="/ratings"
          element={
            <RatingsPage
              userData={userData}
            />}
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              userData={userData}
              setUserData={setUserData}
              fontType={fontType}
              setFontType={setFontType}
              isSoundOn={isSoundOn}
              setIsSoundOn={setIsSoundOn}
              isDefaultFontSize={isDefaultFontSize}
              setIsDefaultFontSize={setIsDefaultFontSize}
            />}
        />
      </Routes>
    </div>

  )
}

export default App
