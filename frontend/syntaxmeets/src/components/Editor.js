import React, { Component } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import { InputLabel, MenuItem, Select, AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import ShareIcon from '@material-ui/icons/Share';
import Switch from '@material-ui/core/Switch';


const divStyle = {
    color: 'white'
};

const languages = [
    "c_cpp",
    "java",
    "python",
    "javascript",
    "html",
    "xml",
    "ruby",
    "css",
    "sass",
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
    "tomorrow",
    "tomorrow_night",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
];

//extracting all the languages recquired
languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});
//extracting themes
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

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



class Editor extends Component {

    onChange(newValue) {
        console.log("change", newValue);
        this.setState({
            value: newValue
        });
    }

    onSelectionChange(newValue, event) {
        console.log("select-change", newValue);
        console.log("select-change-event", event);
    }

    onCursorChange(newValue, event) {
        console.log("cursor-change", newValue);
        console.log("cursor-change-event", event);
    }

    onValidate(annotations) {
        console.log("onValidate", annotations);
    }

    setPlaceholder(e) {
        this.setState({
            placeholder: e.target.value
        });
    }
    setTheme(e) {
        this.setState({
            theme: e.target.value
        });
    }
    setMode(e) {
        this.setState({
            mode: e.target.value
        });
    }
    setBoolean(name, value) {
        this.setState({
            [name]: value
        });
    }
    setFontSize(e) {
        this.setState({
            fontSize: parseInt(e.target.value, 10)
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            value: defaultValue,
            placeholder: "Placeholder Text",
            theme: "tomorrow_night",
            mode: "c_cpp",
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            fontSize: 16,
            showGutter: true,
            showPrintMargin: true,
            highlightActiveLine: true,
            enableSnippets: false,
            showLineNumbers: true
        };

        this.setPlaceholder = this.setPlaceholder.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
    }


    render() {
        return (

            <div className="columns">
                <AppBar position="static" style={{ 'backgroundColor': "#393b44" }}>
                    <Toolbar>
                        <Typography variant="h5" style={{ 'fontFamily': "poppins", "color": "#f1f3f8" }}>
                            CodeEditor &nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>

                    <div className="field">
                    <label>Language:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <div className="control">                            
                            <Select
                                name="mode"
                                labelId="controlled-open-select-label"
                                id="demo-simple-select-filled"
                                value={this.state.mode}
                                onChange={this.setMode}
                                style={divStyle}
                            >
                                {languages.map(lang => (
                                    <MenuItem value={lang} key={lang}>{lang.toUpperCase()}</MenuItem>

                                ))}
                            </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                    <div className="field">
                        <label>Theme:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <div className="control">
                            
                            <span className="select">
                            <Select
                                name="Theme"
                                onChange={this.setTheme}
                                value={this.state.theme}
                                style={divStyle}
                            >
                                {themes.map(lang => (
                                    <MenuItem key={lang} value={lang}>{lang}</MenuItem>

                                ))}
                            </Select>
                                
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                    <div className="field">
                        <label>Font Size:</label>
                        <div className="control">
                            <span className="select">
                            <Select
                                name="Font Size"
                                onChange={this.setFontSize}
                                value={this.state.fontSize}
                                style={divStyle}
                            >
                                {[14, 16, 18, 20, 24, 28, 32, 40].map(lang => (
                                    <MenuItem key={lang} value={lang}>{lang}</MenuItem>

                                ))}
                            </Select>
                                
                            </span>
                        </div>
                    </div>
                        <Button variant="contained" startIcon={<ShareIcon />} style={{ 'fontFamily': "poppins", 'marginLeft': "auto", 'fontWeight': "600", 'color': "#f1f3f8", 'backgroundColor': "#99A3CD" }}>
                            Share</Button>
                    </Toolbar>
                </AppBar>
                <AceEditor
                    placeholder={this.state.placeholder}
                    mode={this.state.mode}
                    theme={this.state.theme}
                    name="blah2"
                    height={550}
                    width={690}
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    onSelectionChange={this.onSelectionChange}
                    onCursorChange={this.onCursorChange}
                    onValidate={this.onValidate}
                    value={this.state.value}
                    fontSize={this.state.fontSize}
                    showPrintMargin={this.state.showPrintMargin}
                    showGutter={this.state.showGutter}
                    highlightActiveLine={this.state.highlightActiveLine}
                    setOptions={{
                        useWorker: false,
                        enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                        enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                        enableSnippets: this.state.enableSnippets,
                        showLineNumbers: this.state.showLineNumbers,
                        tabSize: 2
                    }}
                />
                <AppBar position="static" style={{ 'backgroundColor': "#393b44" }}>
                    <Toolbar>
                            <div className="field">
                                <p className="control">
                                    <label className="checkbox">                                        
                                        <Switch 
                                        checked={this.state.enableBasicAutocompletion} 
                                        onChange={e =>
                                            this.setBoolean(
                                                "enableBasicAutocompletion",
                                                e.target.checked
                                            )} 
                                        color="primary"
                                        />
                                        
                                        Enable Basic Autocomplete &nbsp;&nbsp;
                                    </label>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <label className="checkbox">                                        
                                        <Switch 
                                            checked={this.state.showGutter} 
                                            onChange={e =>
                                                this.setBoolean("showGutter", e.target.checked)
                                            }
                                            color="primary"
                                        />
                                        Show Gutter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </label>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <label className="checkbox">
                                        <Switch 
                                            checked={this.state.showPrintMargin}
                                            onChange={e =>
                                                this.setBoolean("showPrintMargin", e.target.checked)
                                            }
                                            color="primary"
                                        />
                                        Show Print Margin
                                    </label>
                                </p>
                            </div>
                            </Toolbar>
                            <Toolbar>
                        <div className="field">
                            <p className="control">
                                <label className="checkbox">
                                    <Switch 
                                            checked={this.state.highlightActiveLine}
                                            onChange={e =>
                                                this.setBoolean("highlightActiveLine", e.target.checked)
                                            }
                                            color="primary"
                                    />
                                    Highlight Active Line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <label className="checkbox">
                                    <Switch 
                                            checked={this.state.enableSnippets}
                                            onChange={e =>
                                                this.setBoolean("enableSnippets", e.target.checked)
                                            }
                                            color="primary"
                                    />
                                Enable Snippets&nbsp;&nbsp;
                            </label>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <label className="checkbox">
                                    <Switch 
                                            checked={this.state.showLineNumbers}
                                            onChange={e =>
                                                this.setBoolean("showLineNumbers", e.target.checked)
                                            }
                                            color="primary"
                                    />
                                    Show Line Numbers
                                </label>
                            </p>
                        </div>
                    
                    </Toolbar>
                </AppBar>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div className="row">                  
                    <div className="examples column">
                            <h2>Editor</h2>

                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;


/*
<div className="field">
    <label>Mode:</label>
    <p className="control">
        <span className="select">
            <select
                name="mode"
                onChange={this.setMode}
                value={this.state.mode}
            >
                {languages.map(lang => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </span>
    </p>
</div>

*/