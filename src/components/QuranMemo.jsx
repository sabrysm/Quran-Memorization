import React, { useState } from "react";
import "../App.css";

function QuranMemo() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [saveButton, setSaveButton] = useState("Save");
  const [clearButton, setClearButton] = useState("Clear");
  const [counter, setCounter] = useState(1);
  // get surah name, start ayah, end ayah from user
  const [surahName, setSurahName] = useState("");
  const [startAyah, setStartAyah] = useState(1);
  const [endAyah, setEndAyah] = useState("");
  // Make a button to save outputText to a txt file
  const handleSaveButton = () => {
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Quran-Memorization-${surahName}-${startAyah}-${endAyah}.txt`;
    document.body.appendChild(element);
    element.click();
    setSaveButton("Saved");
  };
  
  const handleClearButton = () => {
    setOutputText("");
    setCounter(1);
    setClearButton("Cleared");
    setSurahName("");
    setStartAyah(1);
    setEndAyah("");
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setClearButton("Clear");
    setSaveButton("Save");
  };

  const handleStartAyahChange = (event) => {
    setStartAyah(event.target.value);
    setCounter(parseInt(event.target.value));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setOutputText(outputText + counter + "..." + inputText + "\n");
      setCounter(counter + 1);
      setInputText("");
    }
  };

  return (
    <div className="QuranMemo-App">
      <h1 className="QuranMemo-Header">Quran Memorization</h1>
      <div className="QuranMemo-Container">
        <div className="QuranMemo-settings">
          <input
            type="text"
            value={surahName}
            onChange={(event) => setSurahName(event.target.value)}
            placeholder="اسم السورة"
          />
          <input
            type="text"
            value={startAyah}
            onChange={handleStartAyahChange}
            placeholder="بداية الآية"
          />
          <input
            type="text"
            value={endAyah}
            onChange={(event) => setEndAyah(event.target.value)}
            placeholder="نهاية الآية"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder=" Enter اكتب اول الاية هنا ثم اضغط"
          />
        </div>
        <div className="output-container">
          <textarea className="output-textarea" value={outputText} readOnly />
        </div>
        <div className="button-container">
          <button className="save-button" onClick={handleSaveButton}>
            {saveButton}
          </button>
          <button className="clear-button" onClick={handleClearButton}>
            {clearButton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuranMemo;
