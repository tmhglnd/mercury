autowatch = 1;

inlets = 1;
outlets = 2;
setinletassist(0, "(messages) functions to call");
setoutletassist(0, "(messages) output to audiofile dictionary");
setoutletassist(1, "(messages) output to instrument binding dictionary");

var projectDir;

function setPath(path){
	projectDir = path.split("/");
	projectDir = projectDir.splice(0, projectDir.length-2).join("/");
}//setPath()

function recursiveFolder(path){
	var allFiles = folder(path);
	
	outlet(0, "clear");
	outlet(1, "clear");
	
	for (var i = 0; i < allFiles.length; i++){
		outlet(0, "set", allFiles[i].fileName, allFiles[i].fullPath);
		outlet(1, "set", allFiles[i].fileName);
	}
	
	var fileName = projectDir + "/data/binding-instruments.json";
	var fileName2 = projectDir + "/data/samples.json";
	outlet(0, "write", fileName2);
	//outlet(0, "done");
	outlet(1, "write", fileName);
	outlet(1, "done");
}//recursiveFolder()

function folder(path){
	var f = new Folder(path);
	var files = [];
	f.reset(); //reopens the folder
	
	while (!f.end){
		if (f.filetype == "fold"){
			var foldName;
			
			if (f.pathname.charAt(f.pathname.length-1) != "/"){
				foldName = f.pathname + "/" + f.filename;
			} else {
				foldName = f.pathname + f.filename;
			}
			files = files.concat(folder(foldName));
		} 
		if (f.filetype == "WAVE" || f.filetype == "AIFF"){
			var filePath;
			
			if (f.pathname.charAt(f.pathname.length-1) != "/"){
				filePath = f.pathname + "/" + f.filename;
			} else {
				filePath = f.pathname + f.filename;
			}
			files.push(new file(f.filename, filePath));
		}
		f.next(); //move to next item in folder
	}
	f.close(); //close the folder
	return files; //return file list top concatenate
}//folder()

function file(n, p){
	this.fileName = n.replace(/\.[^/.]+$/, "");
	this.fileExt = n;
	this.fullPath = p;
}//file()

function makeDir(n){
	var path = projectDir + "/" + String(n) +"/";
	outlet(0, "path", path);
}//makeDir()