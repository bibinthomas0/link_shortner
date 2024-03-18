import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Home.css";
import send from './icons/send.png';
import copyicon from './icons/copy.png';
import copiedicon from './icons/copied.png';

function Home() {
  const [longURL, setLongUrl] = useState("");
  const [shortLink, setShortLink] = useState({});
  const [active, setActive] = useState(false);
  const [copy, setCopy] = useState(false);

  const [response, setResponse] = useState(null);
  const apiKey = 'NXeUeHvkoP56UxL5CsiifltiY02gbDY1JW96mOjMRuVAx';

  function handleChange(e) {
    setLongUrl(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
      try {
        const requestBody = {
          url:longURL  // Replace with the URL you want to shorten
        };

        const requestOptions = {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        };

        const res = await fetch('https://shrtlnk.dev/api/v2/link', requestOptions);
        const data = await res.json();
        setResponse(data);
        console.log(data);
        setShortLink(data.shrtlnk)
        setActive(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
 
  }

  return (
    <div className="App">
      <h2>A Simple Bitly Link Shortener</h2>
      <div>
        <form method="post" action="" onSubmit={handleSubmit}>
          <input
            name="long_url"
            type="text"
            value={longURL}
            placeholder="Paste your url"
            onChange={handleChange}
          />
          <button type="submit"><img src={send} alt="send icon" id="send_icon"/></button>
        </form>
        
      </div>

      {/* show on success... */}

      {active ? (
        <div className="show_links">
          {/* <img src={shortLink} alt="Qr code" className="qr_img"/> */}
          <div>
            <h3>Here's your short link...</h3>
            <span>
              <p>{shortLink}</p>
              <CopyToClipboard onCopy={()=>{
                setCopy(true);
              }} text={shortLink}>{ !copy ? <img src={copyicon} alt="copy icon" width="17px" height="17px"/> : <img src={copiedicon} alt="copy icon" width="17px" height="17px"/>  }</CopyToClipboard>

            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;