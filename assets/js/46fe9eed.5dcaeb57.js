"use strict";(self.webpackChunkmercury_docs=self.webpackChunkmercury_docs||[]).push([[991],{4701:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>a});var s=i(4848),r=i(8453);const o={sidebar_position:2,id:"mercury4max-overview"},l="\ud83c\udfd4 Mercury4Max Overview",t={id:"usage/mercury4max-overview",title:"\ud83c\udfd4 Mercury4Max Overview",description:"This chapter gives an overview of the features in the user interface of Mercury4Max",source:"@site/docs/usage/mercury4max.md",sourceDirName:"usage",slug:"/usage/mercury4max-overview",permalink:"/mercury/docs/usage/mercury4max-overview",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,id:"mercury4max-overview"},sidebar:"tutorialSidebar",previous:{title:"\ud83d\udedd MercuryPlayground Overview",permalink:"/mercury/docs/usage/playground-overview"},next:{title:"\ud83e\ude73 Short-keys",permalink:"/mercury/docs/usage/shortkeys"}},d={},a=[{value:"Mercury Folder",id:"mercury-folder",level:2},{value:"Change the <code>/Mercury</code> Folder location",id:"change-the-mercury-folder-location",level:3},{value:"Sounds",id:"sounds",level:3},{value:"Mercury Main Window",id:"mercury-main-window",level:2},{value:"Sound",id:"sound",level:3},{value:"Editor / Visuals",id:"editor--visuals",level:3},{value:"CPU and FPS Meter",id:"cpu-and-fps-meter",level:3},{value:"Auto Log Sketch",id:"auto-log-sketch",level:3},{value:"Record Audio",id:"record-audio",level:3},{value:"Show Variables",id:"show-variables",level:3},{value:"Show Audiofiles",id:"show-audiofiles",level:3},{value:"External Editor",id:"external-editor",level:3},{value:"Menubar",id:"menubar",level:2},{value:"File",id:"file",level:3},{value:"Sounds",id:"sounds-1",level:3},{value:"Add",id:"add",level:4},{value:"Replace",id:"replace",level:4},{value:"Default",id:"default",level:4},{value:"Show Loaded",id:"show-loaded",level:4},{value:"Example for file naming",id:"example-for-file-naming",level:4},{value:"Audio Setup",id:"audio-setup",level:3},{value:"Total Instruments",id:"total-instruments",level:4},{value:"Driver",id:"driver",level:4},{value:"Device",id:"device",level:4},{value:"Samplerate",id:"samplerate",level:4},{value:"Buffersize",id:"buffersize",level:4},{value:"Overdrive / Audio Interrupt",id:"overdrive--audio-interrupt",level:4},{value:"Troubleshoot",id:"troubleshoot",level:4},{value:"Visual Setup",id:"visual-setup",level:3},{value:"Aspect Ratio",id:"aspect-ratio",level:4},{value:"Resolution",id:"resolution",level:4},{value:"Visual Resolution",id:"visual-resolution",level:4},{value:"Window Size",id:"window-size",level:4},{value:"Screens",id:"screens",level:4},{value:"Always in front",id:"always-in-front",level:4},{value:"Window visible",id:"window-visible",level:4},{value:"Sync to Refreshrate",id:"sync-to-refreshrate",level:4},{value:"FPS",id:"fps",level:5},{value:"Auto Hide cursor",id:"auto-hide-cursor",level:4},{value:"Fullscreen",id:"fullscreen",level:4},{value:"Syphon output",id:"syphon-output",level:4},{value:"Troubleshoot",id:"troubleshoot-1",level:4},{value:"Editor Setup",id:"editor-setup",level:3},{value:"Shortkeys Setup",id:"shortkeys-setup",level:3},{value:"Customize Shortkeys",id:"customize-shortkeys",level:4},{value:"Explanation",id:"explanation",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"-mercury4max-overview",children:"\ud83c\udfd4 Mercury4Max Overview"}),"\n",(0,s.jsx)(n.p,{children:"This chapter gives an overview of the features in the user interface of Mercury4Max"}),"\n",(0,s.jsx)(n.h2,{id:"mercury-folder",children:"Mercury Folder"}),"\n",(0,s.jsxs)(n.p,{children:["When you start Mercury4Max for the first time it creates a folder ",(0,s.jsx)(n.code,{children:"~/Documents/Mercury"})," containing a few subdirectories like: ",(0,s.jsx)(n.code,{children:"Code Logs"}),", ",(0,s.jsx)(n.code,{children:"Data"}),", ",(0,s.jsx)(n.code,{children:"Library"}),", ",(0,s.jsx)(n.code,{children:"Preferences"})," and ",(0,s.jsx)(n.code,{children:"Recordings"}),". These folders are used to store various files when you are working in Mercury such as recorded sounds, autosaves of the code you evaluate and dictionaries of the loaded soundfiles."]}),"\n",(0,s.jsxs)(n.h3,{id:"change-the-mercury-folder-location",children:["Change the ",(0,s.jsx)(n.code,{children:"/Mercury"})," Folder location"]}),"\n",(0,s.jsxs)(n.p,{children:["You can change the mercury folder location. Go to your download of Mercury4Max, which can be found in ",(0,s.jsx)(n.code,{children:"/Users/<User>/Documents/Max 8/Projects/mercury"})," considering you followed the ",(0,s.jsx)(n.em,{children:"Getting Started"})," steps. In the ",(0,s.jsx)(n.code,{children:"/mercury-ide"})," you will find a file called ",(0,s.jsx)(n.code,{children:"mercury.ini"}),". In the ",(0,s.jsx)(n.code,{children:".ini"})," file you can adjust ",(0,s.jsx)(n.code,{children:"base"})," to the location of your preference:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"base = /Documents/Mercury\nuser = /Users/<yourname>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now restart the ",(0,s.jsx)(n.code,{children:"mercury_ide.maxproj"})," and you can see it generated all the necessary folders in your newly specified location."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Beware that the ",(0,s.jsx)(n.code,{children:"base"})," is appended to the ",(0,s.jsx)(n.code,{children:"user"}),", so the full location will be: ",(0,s.jsx)(n.code,{children:"/Users/<yourname>/Documents/Mercury"})]})}),"\n",(0,s.jsx)(n.h3,{id:"sounds",children:"Sounds"}),"\n",(0,s.jsxs)(n.p,{children:["You can add sounds (samples and single-cycle waveforms) to the Mercury file path so you can use them while coding music. Files can be added through the menubar (see below) but can also be added in the ",(0,s.jsx)(n.code,{children:"mercury-user.ini"})," file. Go to your Mercury folder (by default in ",(0,s.jsx)(n.code,{children:"~/Documents/Mercury"}),") and open the ",(0,s.jsx)(n.code,{children:"mercury-user.ini"})," file. In the file you'll see:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[samples]\npath[] = default\n\n[waveforms]\npath[] = default\n"})}),"\n",(0,s.jsxs)(n.p,{children:["These ",(0,s.jsx)(n.code,{children:"path[]"}),"'s are pointing to the default location of the soundfiles included in Mercury. If you like to add a folder of sounds you can add a new line under ",(0,s.jsx)(n.code,{children:"[samples]"})," or ",(0,s.jsx)(n.code,{children:"[waveforms]"}),". Samples are used with ",(0,s.jsx)(n.code,{children:"new sample"}),", waveforms are used with ",(0,s.jsx)(n.code,{children:"new synth"}),". The path must be an absolute path. For example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[samples]\npath[] = default\npath[] = /Users/<yourusername>/Music/Samples/aSampleFolder/\n"})}),"\n",(0,s.jsxs)(n.p,{children:["On load the system searches for all ",(0,s.jsx)(n.code,{children:".wav"}),", ",(0,s.jsx)(n.code,{children:".aiff"})," and ",(0,s.jsx)(n.code,{children:".mp3"})," files located in this folder and any subdirectories. Folders are loaded from top to bottom of the page. If a file is loaded with the same name of a file that was already loaded it overwrites the previous file."]}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsxs)(n.p,{children:["Folders and all subdirectories are searched for files that match ",(0,s.jsx)(n.code,{children:".wav"}),", ",(0,s.jsx)(n.code,{children:".aiff"})," or ",(0,s.jsx)(n.code,{children:".mp3"}),". Be careful when selecting a folder with many subdirectories and audiofiles."]})}),"\n",(0,s.jsx)(n.h2,{id:"mercury-main-window",children:"Mercury Main Window"}),"\n",(0,s.jsx)(n.p,{children:"The Mercury main window gives you access to the most used settings in the Mercury Environment. For more detailed settings you can use the menubar on top."}),"\n",(0,s.jsx)(n.h3,{id:"sound",children:"Sound"}),"\n",(0,s.jsx)(n.p,{children:"Start or stop the audio calculations (Digital Signal Processing, DSP). Turning this off will disable all processes that are connected to audio or sequencing."}),"\n",(0,s.jsx)(n.h3,{id:"editor--visuals",children:"Editor / Visuals"}),"\n",(0,s.jsx)(n.p,{children:"Start or stop the rendering of the text-editor. This is an OpenGL environment that renders the responsive texteditor in the second window. The rendering is done at a framerate synced to the screen you use (which usually defaults to 60fps). This rendering is also necessary to use when coding visuals displayed behind the text. You don't have to use this texteditor, you can also use an external editor like Pulsar or Flok."}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsxs)(n.p,{children:['The texteditor allows a maximum of 80 characters on a line. If you keep typing past 80 characters, it will create a new line which will be "orphaned" and evaluated without connection to the original line. To avoid this, use the ',(0,s.jsx)(n.code,{children:"set"})," action command to append instrument functions and effects settings using one or more new lines. To use this you must first add a name value, and refer to it in each set command. More details in ",(0,s.jsx)(n.a,{href:"/mercury/docs/reference/actions#set",children:"Actions"}),"."]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"new synth saw name(mySaw) time(1/2)\n  set mySaw note(2 2) shape(1000 500)\n  set mySaw fx(reverb 0.95 12) pan(0.2)\n"})}),(0,s.jsxs)(n.p,{children:["You can also avoid this limitation by using an external editor like Pulsar with the ",(0,s.jsx)(n.a,{href:"https://github.com/tmhglnd/mercury-pulsar",children:"Pulsar-Mercury"})," plugin."]})]}),"\n",(0,s.jsx)(n.h3,{id:"cpu-and-fps-meter",children:"CPU and FPS Meter"}),"\n",(0,s.jsxs)(n.p,{children:["This CPU meter shows the current CPU usage of the audio processes running in Mercury. If you experience a very high cpu-usage (more then 70) you can find some info under ",(0,s.jsx)(n.a,{href:"#audio-setup",children:"Audio Setup"})," to help you adjust settings for your computer."]}),"\n",(0,s.jsxs)(n.p,{children:["The FPS meter shows the current Frames Per Second that the rendering engine is running at. If you experience a very slow framerate (less then 25fps) you can find some info under ",(0,s.jsx)(n.a,{href:"#visual-setup",children:"Visual Setup"})," to help you adjust settings for your computer."]}),"\n",(0,s.jsx)(n.h3,{id:"auto-log-sketch",children:"Auto Log Sketch"}),"\n",(0,s.jsxs)(n.p,{children:["Enabling the Auto Log Code will store a version of your code to the folder ",(0,s.jsx)(n.code,{children:"~/Documents/Mercury/Code Logs"})," for every time you execute your code. This can be helpful to create a history of your code and allow you to look back at your code after a performance."]}),"\n",(0,s.jsx)(n.h3,{id:"record-audio",children:"Record Audio"}),"\n",(0,s.jsxs)(n.p,{children:["Start and stop the recording of the current sound output. The recorded file will be stored to the ",(0,s.jsx)(n.code,{children:"~/Documents/Mercury/Recordings"})," folder with the date and time as the filename."]}),"\n",(0,s.jsx)(n.h3,{id:"show-variables",children:"Show Variables"}),"\n",(0,s.jsxs)(n.p,{children:["View the current ",(0,s.jsx)(n.code,{children:"list"}),"'s that are created from the code in a dictionary. This could be helpful while debugging some code."]}),"\n",(0,s.jsx)(n.h3,{id:"show-audiofiles",children:"Show Audiofiles"}),"\n",(0,s.jsxs)(n.p,{children:["View the loaded soundfiles and waveforms as a system path in a dictionary with their associated name that can be used in Mercury code. Helpful if you want to find the ",(0,s.jsx)(n.code,{children:"name"})," to use in ",(0,s.jsx)(n.code,{children:"new sample"})]}),"\n",(0,s.jsx)(n.h3,{id:"external-editor",children:"External Editor"}),"\n",(0,s.jsx)(n.admonition,{title:"Use the Pulsar plugin or Flok instead",type:"warning"}),"\n",(0,s.jsxs)(n.p,{children:["The external editor allows you to use a textfile from outside the Mercury environment to run as code. Generate a ",(0,s.jsx)(n.code,{children:".txt"})," file somewhere on your computer. Drag-n-drop the file in the box ",(0,s.jsx)(n.em,{children:"drop code file here"}),". This will automatically enable the ",(0,s.jsx)(n.em,{children:"Use External Editor"})," button. Now you can use a external editor such as Atom, VSCode or Sublime to edit your code. Upon saving the code Mercury will detect the changes and execute the current state of the file."]}),"\n",(0,s.jsx)(n.h2,{id:"menubar",children:"Menubar"}),"\n",(0,s.jsx)(n.p,{children:"The menubar gives you access to more functionalities in Mercury such as opening a new file, opening an existing file, saving your code, executing or deleting your code, adding sounds to your library, changing settings for the audio, visuals, editor and keyboard shortcuts and opening examples, documentation and the list of sounds."}),"\n",(0,s.jsx)(n.h3,{id:"file",children:"File"}),"\n",(0,s.jsx)(n.p,{children:"Via the File menu you can:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Create a new file (this will erase all code) : ",(0,s.jsx)(n.code,{children:"CMD + N"})]}),"\n",(0,s.jsxs)(n.li,{children:["Open a file with a ",(0,s.jsx)(n.code,{children:".txt"})," extension as a codefile : ",(0,s.jsx)(n.code,{children:"CMD + O"})]}),"\n",(0,s.jsxs)(n.li,{children:["Save a file from the current code in the editor window : ",(0,s.jsx)(n.code,{children:"CMD + S"})]}),"\n",(0,s.jsxs)(n.li,{children:["Execute Code : ",(0,s.jsx)(n.code,{children:"ALT + RETURN"})]}),"\n",(0,s.jsxs)(n.li,{children:["Silence Code : ",(0,s.jsx)(n.code,{children:"ALT + ."})]}),"\n",(0,s.jsxs)(n.li,{children:["Clear Code (same as new file) : ",(0,s.jsx)(n.code,{children:"CMD + N"})]}),"\n",(0,s.jsxs)(n.li,{children:["Load External Editor File (see ",(0,s.jsx)(n.a,{href:"#external-editor",children:"external editor"}),")"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"sounds-1",children:"Sounds"}),"\n",(0,s.jsxs)(n.p,{children:["Via the Sounds menu you can add folders of sounds and waveforms to the searchpath of the Mercury environment. The filenames of these sounds can then be used in the code to refer to. This works best if you rename your files to shorter filenames and ",(0,s.jsx)(n.strong,{children:"don't"})," use spaces in the name.  These files will be loaded into the RAM, so try to keep the loaded soundfiles under ",(0,s.jsx)(n.strong,{children:"4 GB"}),"."]}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsxs)(n.p,{children:["Folders are searched for all subdirectories for files that match ",(0,s.jsx)(n.code,{children:".wav"}),", ",(0,s.jsx)(n.code,{children:".aiff"})," or ",(0,s.jsx)(n.code,{children:".mp3"}),". Be careful when selecting a folder with many subdirectories and audiofiles."]})}),"\n",(0,s.jsx)(n.h4,{id:"add",children:"Add"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.strong,{children:"Add"})," option appends all the found audiofiles to the current list of already loaded files. The path is stored in ",(0,s.jsx)(n.code,{children:"mercury-user.ini"}),". A library with the loaded sounds is stored under ",(0,s.jsx)(n.code,{children:"~/Documents/Mercury/Data"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"replace",children:"Replace"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.strong,{children:"Replace"})," option removes all the current loaded files from the library and only addes the files that are found in the currently selected folder (and subfolders). The ",(0,s.jsx)(n.code,{children:"mercury-user.ini"})," file and library are updated accordingly."]}),"\n",(0,s.jsx)(n.h4,{id:"default",children:"Default"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.strong,{children:"Default"})," option resets the library to the files that are included in the Mercury project by default. These files can be found in the ",(0,s.jsx)(n.code,{children:"mercury_ide/media"})," folder. The ",(0,s.jsx)(n.code,{children:"mercury-user.ini"})," file is updated as well."]}),"\n",(0,s.jsx)(n.h4,{id:"show-loaded",children:"Show Loaded"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.strong,{children:"Show Loaded"})," option opens the library of loaded soundfiles and waveforms. This will give you insight in if your files were loaded correctly and also shows you the buffername, duration, number of channels and samplerate of the files."]}),"\n",(0,s.jsx)(n.h4,{id:"example-for-file-naming",children:"Example for file naming"}),"\n",(0,s.jsxs)(n.p,{children:["I have a soundfile: ",(0,s.jsx)(n.code,{children:"my cool Sound 05.wav"})," on the computer."]}),"\n",(0,s.jsx)(n.p,{children:"Using this in Mercury like so:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"new sample my cool Sound 05\n"})}),"\n",(0,s.jsxs)(n.p,{children:["will not work, since it will interpret the spaces as new keywords. Therefore I rename the file with underscores to: ",(0,s.jsx)(n.code,{children:"my_cool_Sound_05.wav"}),". Now I can use this file like so:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"new sample my_cool_Sound_05\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Since I find this filename a bit long to type during a live coding session I decide to rename it a bit shorter like so: ",(0,s.jsx)(n.code,{children:"sound05.wav"}),". Now the code will look like this after importing the sound:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"new sample sound05\n"})}),"\n",(0,s.jsx)(n.h3,{id:"audio-setup",children:"Audio Setup"}),"\n",(0,s.jsx)(n.p,{children:"The Audio Setup lets you adjust settings for the sound processing in the Mercury environment. You can hover your mouse over the settings to see a small description of the options and their default values."}),"\n",(0,s.jsx)(n.h4,{id:"total-instruments",children:"Total Instruments"}),"\n",(0,s.jsxs)(n.p,{children:["The Total Instruments determines how many instruments can be used in the code. An instrument is every line of code that starts with ",(0,s.jsx)(n.code,{children:"new ..."}),". The default is 10 instruments, which is usually enough for live coding performances."]}),"\n",(0,s.jsx)(n.h4,{id:"driver",children:"Driver"}),"\n",(0,s.jsxs)(n.p,{children:["Adjust the Audio Driver. For Mac ",(0,s.jsx)(n.code,{children:"Core Audio"})," is recommended, for Windows the ",(0,s.jsx)(n.code,{children:"Asio4All"})," driver (if not available please install)."]}),"\n",(0,s.jsx)(n.h4,{id:"device",children:"Device"}),"\n",(0,s.jsxs)(n.p,{children:["Select your input and output devices for the sounds. This usually defaults to ",(0,s.jsx)(n.code,{children:"Built-in Microphone"})," and ",(0,s.jsx)(n.code,{children:"Built-in Output"}),", but can be changed if you are using an external sound card for example."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Bluetooth headphones have been giving some troubles with the samplerate and processing up till now"})}),"\n",(0,s.jsx)(n.h4,{id:"samplerate",children:"Samplerate"}),"\n",(0,s.jsxs)(n.p,{children:["Adjust the samplerate for the audio processing. A higher samplerate gives a better sound quality but is heavier on the computer (cpu) to process. The default is ",(0,s.jsx)(n.code,{children:"44100"})," Hz, which is in most applications more then enough."]}),"\n",(0,s.jsx)(n.h4,{id:"buffersize",children:"Buffersize"}),"\n",(0,s.jsxs)(n.p,{children:["Adjust the I/O (input/output) and Signal buffersize. This determines the blocksize of samples that are presented to the cpu to calculate at once. A lower buffersize gives less latency on the audio output, but a higher cpu usage. A higher buffersize gives a lower cpu usage, but there will be more latency. In most cases an buffersize of ",(0,s.jsx)(n.code,{children:"256"})," samples is good."]}),"\n",(0,s.jsx)(n.h4,{id:"overdrive--audio-interrupt",children:"Overdrive / Audio Interrupt"}),"\n",(0,s.jsx)(n.p,{children:"Turn Overdrive on to give priority over midi-events and scheduling. Enable this when audio is your highest priority, disable this when visuals are you highest priority. Enabling is recommended."}),"\n",(0,s.jsx)(n.p,{children:"When Overdrive is enable the Audio Interrupt can also be enabled. This links the timing of events to the signal buffersize in the audio thread. Enabling this greatly improves the timing accuracy when working with lower buffersizes. Higher buffersize might make it drop a few beats when playing on high tempos. Enabling is recommended."}),"\n",(0,s.jsx)(n.h4,{id:"troubleshoot",children:"Troubleshoot"}),"\n",(0,s.jsx)(n.p,{children:"In case you are experiencing a very high cpu usage please try the following settings:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Total instruments: ",(0,s.jsx)(n.code,{children:"4"})]}),"\n",(0,s.jsxs)(n.li,{children:["Driver: ",(0,s.jsx)(n.code,{children:"Core Audio"})," or ",(0,s.jsx)(n.code,{children:"Asio4All"})]}),"\n",(0,s.jsxs)(n.li,{children:["Samplerate: ",(0,s.jsx)(n.code,{children:"44100"})]}),"\n",(0,s.jsxs)(n.li,{children:["I/O Buffersize: ",(0,s.jsx)(n.code,{children:"1024"})]}),"\n",(0,s.jsxs)(n.li,{children:["Signal Buffersize: ",(0,s.jsx)(n.code,{children:"512"})]}),"\n",(0,s.jsxs)(n.li,{children:["Overdrive: ",(0,s.jsx)(n.code,{children:"on"})]}),"\n",(0,s.jsxs)(n.li,{children:["Audio Interrupt: ",(0,s.jsx)(n.code,{children:"on"})]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"visual-setup",children:"Visual Setup"}),"\n",(0,s.jsx)(n.p,{children:"The Visual Setup lets you adjust settings for the visual output in the editor window of the Mercury environment. You can hover your mouse over the settings to see a small description of the options and their default values."}),"\n",(0,s.jsx)(n.h4,{id:"aspect-ratio",children:"Aspect Ratio"}),"\n",(0,s.jsx)(n.p,{children:"Adjust the aspect ratio of the screen. You can choose between a variety of common used aspect ratios:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"1:1 (Instagram)"}),"\n",(0,s.jsx)(n.li,{children:"5:4 (Early Television)"}),"\n",(0,s.jsx)(n.li,{children:"4:3 (Television)"}),"\n",(0,s.jsx)(n.li,{children:"11:8 (Academy Ratio 1.375:1)"}),"\n",(0,s.jsx)(n.li,{children:"1.414:1 (squareroot of 2 / \u221a2)"}),"\n",(0,s.jsx)(n.li,{children:"3:2 (35mm Still Photograph)"}),"\n",(0,s.jsx)(n.li,{children:"14:9 (Compromise for 4:3 and 16:9)"}),"\n",(0,s.jsx)(n.li,{children:"16:10 (Computer Screen / Macbook)"}),"\n",(0,s.jsx)(n.li,{children:"1.6180:1 (Golden Ratio phi)"}),"\n",(0,s.jsx)(n.li,{children:"16:9 (Widescreen 1.78:1)"}),"\n",(0,s.jsx)(n.li,{children:"18:9 (Univisium 2:1)"}),"\n",(0,s.jsx)(n.li,{children:"22:10 (70 mm Film)"}),"\n",(0,s.jsx)(n.li,{children:"21:9 (Panavision 7:3)"}),"\n",(0,s.jsx)(n.li,{children:"47:20 (Cinemascope 2.35:1)"}),"\n",(0,s.jsx)(n.li,{children:"2.414:1 (Silver Ratio)"}),"\n",(0,s.jsx)(n.li,{children:"69:25 (Ultra Panavision 2.76:1)"}),"\n",(0,s.jsx)(n.li,{children:"36:10 (IMAX Ultra 3.6:1)"}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"resolution",children:"Resolution"}),"\n",(0,s.jsx)(n.p,{children:"Adjust the main visual resolution. This resolution is the height of the window in pixels and the width is adjust according to the aspect ratio. You can choose between a variety of commonly used resolutions such as 720p, 1080p and 4k."}),"\n",(0,s.jsx)(n.h4,{id:"visual-resolution",children:"Visual Resolution"}),"\n",(0,s.jsx)(n.p,{children:"The visual resolution allows you to keep a clear and sharp text on the foreground while rendering visuals on a lower resolution. This is useful for machines without a dedicated graphics card that still want to process visuals in the background."}),"\n",(0,s.jsx)(n.h4,{id:"window-size",children:"Window Size"}),"\n",(0,s.jsxs)(n.p,{children:["Adjust the size of the window with this message. For fullscreen you can click the toggle at ",(0,s.jsx)(n.a,{href:"#fullscreen",children:"fullscreen"})," or press ",(0,s.jsx)(n.code,{children:"ESC"})," to go in and out of fullscreen."]}),"\n",(0,s.jsx)(n.h4,{id:"screens",children:"Screens"}),"\n",(0,s.jsx)(n.p,{children:"The number in this box multiplies your width by this value which allows you to stretch the visuals over multiple screens."}),"\n",(0,s.jsx)(n.h4,{id:"always-in-front",children:"Always in front"}),"\n",(0,s.jsx)(n.p,{children:"Enable this option to make sure the editor window is always in front of all the other Mercury windows."}),"\n",(0,s.jsx)(n.h4,{id:"window-visible",children:"Window visible"}),"\n",(0,s.jsx)(n.p,{children:"Disable this option if you don't need to see the editor window. For example when you're working with an external editor."}),"\n",(0,s.jsx)(n.h4,{id:"sync-to-refreshrate",children:"Sync to Refreshrate"}),"\n",(0,s.jsx)(n.p,{children:"Syncs the rendering framerate to the refreshrate of your computer display. Disable this option if you want to set the FramesPerSecond manually."}),"\n",(0,s.jsx)(n.h5,{id:"fps",children:"FPS"}),"\n",(0,s.jsx)(n.p,{children:"Set the FramesPerSecond for the rendering engine manually. Only possible when Sync to Refreshrate is disabled."}),"\n",(0,s.jsx)(n.h4,{id:"auto-hide-cursor",children:"Auto Hide cursor"}),"\n",(0,s.jsx)(n.p,{children:"Enable this option if you want the mouse to disappear when it's been idle for 5 seconds."}),"\n",(0,s.jsx)(n.h4,{id:"fullscreen",children:"Fullscreen"}),"\n",(0,s.jsxs)(n.p,{children:["Go into fullscreen. You can leave fullscreen with the ",(0,s.jsx)(n.code,{children:"ESC"})," key."]}),"\n",(0,s.jsx)(n.h4,{id:"syphon-output",children:"Syphon output"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Mac only"})}),"\n",(0,s.jsx)(n.p,{children:"Output the visual window as a texture via a syphonserver. This can be used to transfer the visuals to different capture software like OBS for livestream or recording."}),"\n",(0,s.jsx)(n.h4,{id:"troubleshoot-1",children:"Troubleshoot"}),"\n",(0,s.jsx)(n.p,{children:"In case you are experiencing a very laggy editor, slow cursor, low FPS and slow response try the following settings:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Aspect Ratio: ",(0,s.jsx)(n.code,{children:"16:10"})]}),"\n",(0,s.jsxs)(n.li,{children:["Resolution: ",(0,s.jsx)(n.code,{children:"540"})]}),"\n",(0,s.jsxs)(n.li,{children:["Visual Resolution: ",(0,s.jsx)(n.code,{children:"270"})]}),"\n",(0,s.jsxs)(n.li,{children:["Window Size: ",(0,s.jsx)(n.code,{children:"540"})]}),"\n",(0,s.jsxs)(n.li,{children:["Sync to Refreshrate: ",(0,s.jsx)(n.code,{children:"off"})]}),"\n",(0,s.jsxs)(n.li,{children:["FPS: ",(0,s.jsx)(n.code,{children:"30"})]}),"\n",(0,s.jsxs)(n.li,{children:["Auto Hide Cursor: ",(0,s.jsx)(n.code,{children:"off"})]}),"\n",(0,s.jsxs)(n.li,{children:["Syphon Output: ",(0,s.jsx)(n.code,{children:"off"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"For Mac users with Retina display and Max version 8.1.0 or higher and MacOS 10.13 or older."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Go to ",(0,s.jsx)(n.code,{children:"Applications"})," in the Finder"]}),"\n",(0,s.jsxs)(n.li,{children:["Right click ",(0,s.jsx)(n.code,{children:"Max.app"})," (",(0,s.jsx)(n.code,{children:"CMD + Click"}),")"]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.code,{children:"Get Info"})]}),"\n",(0,s.jsxs)(n.li,{children:["Select ",(0,s.jsx)(n.code,{children:"Open in Low Resolution"})]}),"\n",(0,s.jsx)(n.li,{children:"Restart Max and the Mercury project"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"editor-setup",children:"Editor Setup"}),"\n",(0,s.jsx)(n.p,{children:"Adjust the look of the texteditor. Change the font, color, blinking color, cursor color and characters and adjust scaling and position."}),"\n",(0,s.jsx)(n.h3,{id:"shortkeys-setup",children:"Shortkeys Setup"}),"\n",(0,s.jsxs)(n.p,{children:["You can customize the shortkeys by opening the ",(0,s.jsx)(n.code,{children:"Setup Shortkeys"})," under ",(0,s.jsx)(n.code,{children:"Settings"})," in the menubar. You can also reset to the default key commands."]}),"\n",(0,s.jsx)(n.h4,{id:"customize-shortkeys",children:"Customize Shortkeys"}),"\n",(0,s.jsxs)(n.p,{children:["You can customize the shortkeys by opening the ",(0,s.jsx)(n.code,{children:"Setup Shortkeys"})," under ",(0,s.jsx)(n.code,{children:"Settings"})," in the menubar. You can also reset to the default key commands."]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Select the key you would like to customize in the dropdown menu on the top."}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.code,{children:"change keycommand"}),", it now displays ",(0,s.jsx)(n.code,{children:"waiting for keys..."}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Hit the key combination you would like to use for this command and release the keys to store."}),"\n",(0,s.jsx)(n.li,{children:"Check if stored correctly in the scroll-menu below. Every command displays the shortcut and keycode."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"explanation",children:"Explanation"}),"\n",(0,s.jsx)(n.p,{children:"Open a random example, the documentation, the list of sounds and waveforms, the github repository and the published paper."})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>t});var s=i(6540);const r={},o=s.createContext(r);function l(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);