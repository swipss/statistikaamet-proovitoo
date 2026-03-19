import { useState } from "react";
import "./App.css";

function App() {
  return (
    <main className="p-8 flex justify-center min-h-screen">
      <div className="bg-white p-8  border-black border">
        <h1 className="font-bold mb-4 text-headline-lg font-sans!">
          Statistikaamet
        </h1>
        <p className="mb-4">
          Tere tulemast Statistikaameti kodulehele! Siit leiate erinevaid
          statistilisi andmeid ja analüüse.
        </p>
      </div>
    </main>
  );
}

export default App;
