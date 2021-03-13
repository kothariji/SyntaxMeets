export const languages = [
    "c_cpp",
    "clojure",
    "csharp",
    "cobol",
    "erlang",
    "fortran",
    "golang",
    "groovy",
    "java",
    "javascript",
    "kotlin",
    "php",
    "python",
    "r",
    "ruby",
    "sql",
    "swift",
    "typescript",
];

export const defaultValue = `#include <bits/stdc++.h>
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

export const defaultLanguageCode = [
	{
		id: 54,
		code: '#include <bits\/stdc++.h>\nusing namespace std;\n\nint main() {\n\t\/\/ your code goes here\n\treturn 0;\n}\n',
	},
	{
		id: 50,
		code: '#include <stdio.h>\n\nint main(void) {\n\t\/\/ your code goes here\n\treturn 0;\n}\n',
	},
	{
		id: 86,
		code: '; your code goes here\n',
	},
	{
		id: 62,
		code: 'import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\n\/* Name of the class has to be \"Main\" only if the class is public. *\/\nclass Solution\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t\/\/ your code goes here\n\t}\n}\n',
	},
	{
		id: 51,
		code: 'using System;\n\npublic class Test\n{\n\tpublic static void Main()\n\t{\n\t\t\/\/ your code goes here\n\t}\n}\n',
	},
	{
		id: 71,
		code: '# your code goes here\n',
	},
	{
		id: 80,
		code: '\n',
	},
	{
		id: 72,
		code: '# your code goes here\n',
	},
	{
		id: 82,
		code: '',
	},
	{
		id: 83,
		code: '',
	},
	{
		id: 74,
		code: '',
	},
	{
		id: 68,
		code: '<?php\n\n\/\/ your code goes here\n',
	},
	{
		id: 60,
		code: 'package main\nimport \"fmt\"\n\nfunc main(){\n\t\/\/ your code goes here\n}\n',
	},
	{
		id: 59,
		code: 'program TEST\n\t! your code goes here\n\tstop\nend\n',
	},
	{
		id: 58,
		code: '-module(prog).\n-export([main\/0]).\n\nmain() ->\n\t% your code goes here\n\ttrue.\n',
	},
	{
		id: 77,
		code: '\t\t\tIDENTIFICATION DIVISION.\n\t\t\tPROGRAM-ID. hello.\n\t\t\tPROCEDURE DIVISION.\n\t\t\tDISPLAY \"Hello World!\".\n\t\t\tSTOP RUN.',
	},
	{
		id: 74,
		code: '',
	},
	{
		id: 88,
		code: '',
	},
	{
		id: 78,
		code: '',
	},
	{
		id: 63,
		code: '',
	},
];

export const LangOptions = [
    "C",
    "C++",
    "Python",
    "JAVA",
    "JavaScript",
    "Kotlin",
    "Clojure",
    "C#",
    "COBOL",
    "Erlang",
    "FortRan",
    "Go",
    "Groovy",
    "PHP",
    "R",
    "Ruby",
    "SQL",
    "Swift",
    "TypeScript",
];

export const langId = {
    "C" : 50,
    "C++" : 54,
    "Clojure" : 86,
    "C#": 51,
    "COBOL": 77,
    "Erlang": 58,
    "FortRan": 59,
    "Go": 60,
    "Groovy": 88,
    "JAVA": 62,
    "JavaScript": 63,
    "Kotlin": 78,
    "PHP": 68,
    "Python": 71,
    "R": 80,
    "Ruby": 72,
    "SQL": 82,
    "Swift": 83,
    "TypeScript": 74
};

export const langMode = {
    "C": "c_cpp",
    "C++": "c_cpp",
    "Clojure": "clojure",
    "C#": "csharp",
    "COBOL": "cobol",
    "Erlang": "erlang",
    "FortRan": "fortran",
    "Go": "golang",
    "Groovy": "groovy",
    "JAVA": "java",
    "JavaScript": "javascript",
    "Kotlin": "kotlin",
    "PHP": "php",
    "Python": "python",
    "R": "r",
    "Ruby": "ruby",
    "SQL": "sql",
    "Swift": "swift",
    "TypeScript": "typescript",
};

export const themes = [
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
