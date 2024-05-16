import { useState,useRef, useEffect } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState(); 


  const passwordGenrator = () =>
    {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllowed) str += "0123456789";
      if(charAllowed) str += "!@#$%^&*(){}:";

      for(let i=1;i<=length;i++)
        {
          let char = Math.floor(Math.random() * str.length + 1)
          pass += str.charAt(char);
        }

        setPassword(pass);

    }

    //Ref
    const passRef = useRef(null);

    const passCopy = () =>
      {
        passRef.current?.select();
        passRef.current?.setSelectionRange(0,999);
        window.navigator.clipboard.writeText(password);
      }



    useEffect(()=>{
      passwordGenrator();
    },[length,numberAllowed,charAllowed])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center mb-2'>Password Genrator</h1>



        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
          value={password}
          className='outline-none w-full  py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passRef}
          />
          <button 
          onClick={passCopy}
          className='outline-none bg-blue-700 text-white 
          px-3 py-1 shrink-0'>Copy</button>
        </div>



        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}} 
            />
            <label>Length: {length} </label>
          </div>




          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{setNumberAllowed((prev) => !prev)}}
            />
            <label>Numbers</label>
          </div>



          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=>{setCharAllowed((prev) => !prev)}}
            />
            <label>Character</label>
          </div>


        </div>

      </div>
    </>
  )
}

export default App
