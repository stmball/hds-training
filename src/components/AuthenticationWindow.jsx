import * as React from "react"

const AuthenticationWindow = ({ save_auth }) => {

  const [passwordInput, setPasswordInput] = React.useState('')
  const [incorrectPassword, setIncorrectPassword] = React.useState(false)


  const valdiate_password = async (e) => {
    e.preventDefault()

    const encoder = new TextEncoder()
    const data = encoder.encode(passwordInput)

    const hashBuffer = await crypto.subtle.digest("SHA-256", data)

    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log(hashHex);

    // daa_tr41n1ng
    if (hashHex === "1223daab298442c78b3cfdb79a2c2dbce6e927b7147b0201b80cdf6455bfbab5") {
      save_auth()
    } else {
      setIncorrectPassword(true)
    }
  }

  return (<div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
    <h1 className="text-2xl font-bold">Please Enter a Password Below</h1>
    {incorrectPassword && <p>Incorrect Password, please try again!</p>}
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => valdiate_password(e)}>
      <input
        type="text"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="password"
        className="bg-slate-200 p-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-slate-800 text-slate-100 px-8 py-2 rounded-sm"
      >Enter</button>
    </form>
  </div>)
}

export default AuthenticationWindow
