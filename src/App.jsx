import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [Password, setPassword] = useState("");
  const password_ref = useRef(null);
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, number, character]);
  const copyPasswordToClipboard = useCallback(() => {
    password_ref.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);
  useEffect(() => {
    passwordgenerator();
  }, [length, number, character, setPassword]);
  return (
    <div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3 font-bold">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3 rounded-lg"
            placeholder="Password"
            readOnly
            ref={password_ref}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-yellow-200 text-white px-3 py-0.5 shrink-0 rounded-lg text-center ml-2"
          >
            Copy
          </button>
        </div>
        <div className="flex texy-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setnumber((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={character}
            id="characterInput"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
