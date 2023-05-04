import React, { useState } from "react";
import "../App.css";

function QuranMemo() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [counter, setCounter] = useState(1);
  const [saveButton, setSaveButton] = useState("Save");
  const [clearButton, setClearButton] = useState("Clear");
  // take the surah name and range of ayahs from the user
  const [surahName, setSurahName] = useState("");
  const [startAyah, setStartAyah] = useState("");
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
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setClearButton("Clear");
    setSaveButton("Save");
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      // make the counter appear inside a quranic ayah format
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
            onChange={(event) => setStartAyah(event.target.value)}
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
