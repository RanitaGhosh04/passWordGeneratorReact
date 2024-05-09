import { useState } from 'react';
import './App.css';
import { lowercaseLetters, numbers, special, upperCaseLetters } from './data';
import Modal from './Modal';

function App() {
  
 
  const [password, setpassword] = useState("")
  const [counter, setcounter] = useState(6)
  const [isUppercase, setisUppercase] = useState(false)
  const [isLowercase, setisLowercase] = useState(false)
  const [isNumber, setisNumber] = useState(false)
  const [isSymbol, setisSymbol] = useState(false)
  const [modal, setmodal] = useState({
    title : '',
    show : false,
    message : '',
  })

  const increaseCounter = (e) => {
    e.preventDefault();

    if(counter < 20){
      setcounter((prevCounter) => prevCounter+1)
    }
  }

  const decreaseCounter = (e) => {
    e.preventDefault();

    if(counter >6){
      setcounter((prevCounter) => prevCounter-1)
    }
  }

  const generatePassword = (e) =>{
    e.preventDefault();
    let _password = ''

    for(let i=0 ; i<counter ; i++)
      {
        _password += getRandom()
      }

      setpassword(_password)
    }


  const getRandom = () =>{
    const chars = []

    if(isUppercase)
      {
        chars.push(upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)])
      }

      if(isLowercase)
        {
          chars.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)])
        }

        if(isNumber)
          {
            chars.push(numbers[Math.floor(Math.random() * numbers.length)])
          }

          if(isSymbol)
            {
              chars.push(special[Math.floor(Math.random() * special.length)])
            }

            if(chars.length===0)
              {
                return
              }

              return chars[Math.floor(Math.random()*chars.length)]
  }

  const createCopy = () =>{
    const textAreaEl = document.createElement('textarea')
    textAreaEl.innerText = password
    document.body.appendChild(textAreaEl)
    textAreaEl.select();
    document.execCommand('copy')
    textAreaEl.remove()
  }

  const copyPasswordHandler = (e) => {
    e.preventDefault()
    if(password.trim().length === 0){
      setmodal({
        title : 'Error',
        message : 'There is nothing to copy',
        show : true
      })
      }

      else{
        setmodal({
          title : 'success',
          message : 'Password successfully copied to clipboard',
          show : true
        })


    }
    createCopy();
  }

  const closeModalHandler = () => {
    setmodal({...modal,show:false})
  }
  return (
    <div className="App">
      {modal.show && <Modal onClose={closeModalHandler} title={modal.title} message = {modal.message}/>}
      <div className='generator'>
        <h2 className='generator_title'>Password Generator</h2>
        <h4 className='password'>{password}</h4>
        <form action='' className='generator_form'>
        <div className='generator_form-controls'>

          <div className='generator_form-control'>
            <label htmlFor='uppercase'>Uppercase</label>
            <input

             checked = {isUppercase}
             onChange={(e) => setisUppercase(e.target.checked)}

             type='checkbox'
             id='uppercase'
             name='uppercase'/>
          </div>

          <div className='generator_form-control'>
            <label htmlFor='Lowercase'>Lowercase</label>
            <input 
            checked = {isLowercase}
            onChange={(e) => setisLowercase(e.target.checked)}
            type='checkbox'
             id='lowercase'
              name='lowercase'/>
          </div>

          <div className='generator_form-control'>
            <label htmlFor='numbers'>Numbers</label>
            <input
            checked = {isNumber}
            onChange={(e) => setisNumber(e.target.checked)}
             type='checkbox'
             id='numbers' 
             name='numbers'/>
          </div>


          <div className='generator_form-control'>
            <label htmlFor='uppercase'>Symbols</label>
            <input 
            checked = {isSymbol}
            onChange={(e) => setisSymbol(e.target.checked)}
            type='checkbox' 
            id='symbols' 
            name='symbols'/>
          </div>

          <div className='generator__length'>
            <div className='generator__length-title'>Password Length</div>
             <div className='generator_length-counter'>
              <button onClick={decreaseCounter} >-</button>
              <span>{counter}</span>
              <button onClick={increaseCounter} >+</button>
             </div>
          </div>

          <div className='generator__form-actions'>
            <button onClick={generatePassword} className='btn generate-btn'>Generate Password</button>
            <button onClick={copyPasswordHandler} className='btn copy-btn'>Copy Password</button>
          </div>

        </div>
      </form>
      </div>

     
    </div>
  );
}

export default App;
