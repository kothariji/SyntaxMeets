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
import localClasses from "./SyntaxEditor.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {languages, defaultValue, langMode, LangOptions, revLangMode, langId, themes} from "./LanguageData"


//extracting all the languages recquired
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

//extracting themes
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));



const axios = require("axios");

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


  const [value, setValue] = useState(defaultValue);
  const [currLang, setCurrLang] = useState("C++")
  const [mode, setMode] = useState(langMode["C++"]);
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(16);
  const [autoCompletion, setautoCompletion] = useState(true);

  let codeToRun = 0;
  var codeToken = 0;
  const classes = useStyles();

 

  useEffect(() => {
    setMode(langMode[currLang])
  }, [currLang])

  props.socket.on("message", (newValue) => {
    setValue(newValue);
  });

  const handleChange = (newValue) => {
    codeToRun = newValue;
    props.socket.emit("message", newValue);
  };

  const handleCodeRun = async () => {

    let options = {
      method: "POST",
      url: "https://judge0.p.rapidapi.com/submissions",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "05fd35b827mshfecd08e79e94514p11d0eejsn781d4a5696da",
        "x-rapidapi-host": "judge0.p.rapidapi.com",
      },
      data: {
        language_id: langId[currLang],
        source_code: codeToRun,
        stdin: "10",
      },
    };
    console.log(options)
    await axios
      .request(options)
      .then(function (response) {
        codeToken = response.data.token;
        console.log(codeToken);
      })
      .catch(function (error) {
        console.error(error);
      });



    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(7000);
    console.log("Waited 7s");

    options = {
      method: "GET",
      url: "https://judge0.p.rapidapi.com/submissions/" + codeToken,
      headers: {
        "x-rapidapi-key": "05fd35b827mshfecd08e79e94514p11d0eejsn781d4a5696da",
        "x-rapidapi-host": "judge0.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <div className={localClasses.Editor__navbar}>
          <Typography
            variant="h5"
            style={{
              fontFamily: "poppins",
              color: "white",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "30px",
              fontWeight: "800",
            }}
          >
            &nbsp;Syntax<span style={{ color: "#FFD500" }}>Editor</span>
          </Typography>
          {console.log(props.roomId)}
          <Toolbar>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                id="mode-label"
                style={{ fontFamily: "poppins", color: "#FFD500" }}
              >
                Language
              </InputLabel>
              <Select
                name="mode"
                labelId="mode-label"
                id="select-mode"
                value={langMode[currLang]}
                onChange={(e) => {
                  setCurrLang(revLangMode[ e.target.value]);
                }}
                label="Language"
                style={{ fontFamily: "poppins", color: "#ffffff" }}
              >
                {LangOptions.map((language) => (
                  <MenuItem value={langMode[language]} key={language}>
                    <span className={localClasses.Menu__options}>
                      {language}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
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
                  <MenuItem key={lang} value={lang}>
                    <span className={localClasses.Menu__options}> {lang} </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
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
                    <span className={localClasses.Menu__options}> {size} </span>
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
            control={
              <Switch
                color="primary"
                checked={autoCompletion}
                onChange={() => {
                  setautoCompletion(!autoCompletion);
                }}
                name="EnableAutoCompletion"
              />
            }
            label={
              <Typography>
                <span style={{ color: "white" }}>Enable Auto-complete</span>
              </Typography>
            }
          />
          <Button
            variant="contained"
            color="primary"
           
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
            color="primary"
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
    </Fragment>
  );
};

export default SyntaxEditor;
