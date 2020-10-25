import React, { Fragment, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import {
  AppBar,
  createMuiTheme,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
  withStyles,
  Button,
} from "@material-ui/core";
import localClasses from "./SyntaxEditor.module.css"
import { pink } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
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

const mutheme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        background: "#393B44",
        "&$selected": {
          backgroundColor: "#99A3CD",
        },
        "&:hover": {
          backgroundColor: "#99A3CD",
        }
      },
    },
  },
});



const useStyles = makeStyles((mutheme) => ({
  formControl: {
    margin: mutheme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: mutheme.spacing(2),
  },
}));


const PurpleSwitch = withStyles({
  switchBase: {
    color: pink[300],
    '&$checked': {
      color: pink[400],
    },
    '&$checked + $track': {
      backgroundColor: pink[400],
    },
  },
  checked: {},
  track: {},
})(Switch);


const SyntaxEditor = (props) => {


  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState("c_cpp");
  const [theme, setTheme] = useState("tomorrow_night");
  const [fontSize, setFontSize] = useState(16);
  const [autoCompletion, setautoCompletion] = useState(true);

  const classes = useStyles();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <ThemeProvider theme={mutheme}>
        <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
          <div className={localClasses.Editor__navbar}>
            <Typography
              variant="h5"
              style={{ fontFamily: "poppins", color: "white", margin: "auto" }}
            >
              SyntaxEditor
          </Typography>
            <Toolbar>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="mode-label" style={{ fontFamily: "poppins", color: "#ffffff" }}>Language</InputLabel>
                <Select
                  name="mode"
                  labelId="mode-label"
                  id="select-mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  label="Language"
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
                  style={{ fontFamily: "poppins", color: "#ffffff" }}
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
                >
                  {themes.map((lang) => (
                    <MenuItem key={lang} value={lang} >
                      <span className={localClasses.Menu__options} > {lang} </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel
                  id="font-label"
                  style={{ fontFamily: "poppins", color: "#ffffff" }}
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
        <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
          <Toolbar>
            <FormControlLabel
              control={<PurpleSwitch checked={autoCompletion} onChange={() => {
                setautoCompletion(!autoCompletion)
              }} name="EnableAutoCompletion" />}
              label={<Typography> <span className={localClasses.Menu__options} >Enable AutoComplete</span> </Typography>}
            />
            <Button
              variant="contained"
              onClick={() => {
                this.saveableCanvas.clear();
              }}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#99A3CD",
              }}
            >
              Compile
                </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Fragment >
  );
};

export default SyntaxEditor;
