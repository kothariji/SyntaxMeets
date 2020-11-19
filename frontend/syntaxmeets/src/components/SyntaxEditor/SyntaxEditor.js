import React, { Fragment, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import {
  AppBar,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
  Button,
} from "@material-ui/core";
import localClasses from "./SyntaxEditor.module.css"
import DeleteIcon from "@material-ui/icons/Delete";


import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');


const axios = require('axios');


//hackerearth
const CLIENT_SECRET = '4e05a818a1627ab7f58a84f30d4ad00d2ff2298c' 





const languages = [
  "java",
  "python",
  "c_cpp",
  "javascript",
  "html",
  "ruby",
  "typescript",
  "kotlin",
  "swift",
  "markdown",
  "mysql",
  "json",
  "golang",
  "csharp",
  "sql",
  "sqlserver",
];

const themes = [
  "monokai",
  "github",
  "tomorrow_night",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

//extracting all the languages recquired
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

//extracting themes
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

//default value to be displayed on code editor
const defaultValue = `#include <bits/stdc++.h>
#define lli long long int
#define endl "\\n"
#define MAX 1000005
#define MOD 1000000007
using namespace std;


int main()
{
	int t;
	cin>>t;
	
	while(t--)
	{
	    //your code
	  
	}
	return 0;
}`;

const useStyles = makeStyles((mutheme) => ({
  formControl: {
    margin: mutheme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: mutheme.spacing(2),
  },
}));




const SyntaxEditor = (props) => {

  let ans = 0;
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState("c_cpp");
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(16);
  const [autoCompletion, setautoCompletion] = useState(true);

  var token = 0;
  const classes = useStyles();


  
  useEffect(() => {
    // this will send server(backend) the roomId in which the socket needs to be joined
    socket.emit('joinroom', props.roomId);
 }, []);


  useEffect(() => {
    socket.on('message', newValue => {
      setValue(newValue)
    })
  })

  const handleChange = (newValue) => {
    ans = newValue;
    socket.emit('message', newValue)
  };

  const handleCodeRun = () => {
  var options = {
    method: 'POST',
    url: 'https://judge0.p.rapidapi.com/submissions',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '05fd35b827mshfecd08e79e94514p11d0eejsn781d4a5696da',
      'x-rapidapi-host': 'judge0.p.rapidapi.com'
  },
  data: {
    language_id: 71,
    source_code: ans,
    stdin: '10'
  }
};
axios.request(options).then( function (response) {
  console.log(ans)
  token = response.data.token;
  console.log(token);
}).catch(function (error) {
	console.error(error);
});



  //   const data = {
  //     client_secret: CLIENT_SECRET,
  //     async: 0,
  //     source: value,
  //     lang: "CPP11",
  //     time_limit: 5,
  //     memory_limit: 262144,
  // }

  //   axios.post('https://api.hackerearth.com/code/run/', data)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  }

  const tempFunc = () => {
    var options = {
      method: 'GET',
      url: 'https://judge0.p.rapidapi.com/submissions/' + token,
      headers: {
        'x-rapidapi-key': '05fd35b827mshfecd08e79e94514p11d0eejsn781d4a5696da',
        'x-rapidapi-host': 'judge0.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  return (
    <Fragment>
        <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
          <div className={localClasses.Editor__navbar}>
            <Typography
              variant="h5"
              style={{ fontFamily: "poppins", color: "white", marginRight: "auto", marginTop: "auto", marginBottom: "auto", marginLeft: "30px", fontWeight: "800" }}
            >
              &nbsp;Syntax<span style={{ "color": "#FFD500"}}>Editor</span>
          </Typography>
            {console.log(props.roomId)}
            <Toolbar>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="mode-label" style={{ fontFamily: "poppins", color: "#FFD500" }}>Language</InputLabel>
                <Select
                  name="mode"
                  labelId="mode-label"
                  id="select-mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  label="Language"
                  style={{ fontFamily: "poppins", color: "#ffffff" }}
                >
                  {languages.map((lang) => (
                    <MenuItem value={lang} key={lang}>
                      <span className={localClasses.Menu__options} > {lang.toUpperCase()} </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl >
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel
                  id="theme-label"
                  style={{ fontFamily: "poppins", color: "#FFD500" }}
                >
                  Theme
              </InputLabel>
                <Select
                  name="Theme"
                  labelId="theme-label"
                  id="select-theme"
                  onChange={(e) => setTheme(e.target.value)}
                  value={theme}
                  label="Theme"
                  style={{ fontFamily: "poppins", color: "#ffffff" }}
                >
                  {themes.map((lang) => (
                    <MenuItem key={lang} value={lang} >
                      <span className={localClasses.Menu__options} > {lang} </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel
                  id="font-label"
                  style={{ fontFamily: "poppins", color: "#FFD500" }}
                >
                  Font Size
              </InputLabel>
                <Select
                  name="Theme"
                  labelId="font-label"
                  id="select-font"
                  onChange={(e) => setFontSize(e.target.value)}
                  value={fontSize}
                  label="Font Size"
                  style={{ fontFamily: "poppins", color: "#ffffff" }}
                >
                  {[14, 16, 18, 20, 24, 28, 32, 40].map((size) => (
                    <MenuItem key={size} value={size}>
                      <span className={localClasses.Menu__options} > {size} </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Toolbar>
          </div>
        </AppBar>
        <AceEditor
          mode={mode}
          theme={theme}
          height="550px"
          width={"auto"}
          onChange={handleChange}
          value={value}
          fontSize={fontSize}
          showPrintMargin
          showGutter
          highlightActiveLine
          setOptions={{
            useWorker: false,
            enableLiveAutocompletion: autoCompletion,
          }}
        />
        <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
          <Toolbar>
            <FormControlLabel
              control={<Switch color="primary" checked={autoCompletion} onChange={() => {
                setautoCompletion(!autoCompletion)
              }} name="EnableAutoCompletion" />}
              label={<Typography><span style = {{color: 'white'}}>Enable Auto-complete</span></Typography>}
            />
            <Button
              variant="contained"
              color = 'primary'
              onClick={tempFunc}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
              }}
            >
              Compile
            </Button>
            <Button
              variant="contained"
              color = 'primary'
              onClick={handleCodeRun}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "10px",
                fontWeight: "600",
                color: "#fff",
                backgroundColor: "#FFD500",
              }}
            >
              Run
            </Button>
          </Toolbar>
        </AppBar>
    </Fragment >
  );
};

export default SyntaxEditor;
