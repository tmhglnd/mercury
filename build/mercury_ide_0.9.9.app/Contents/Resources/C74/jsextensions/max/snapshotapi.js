var snapshotapi = 0;

//use jsarguments to set what is being snapshot (a varname of an object or 'patcher')
if (typeof jsarguments !== "undefined" && jsarguments && jsarguments.length>1) {
	snapshotapi = new SnapshotAPI(jsarguments[1]);
}

//get the number of snapshots
function getnumsnapshots() {
	if (snapshotapi) {
		outlet(0, snapshotapi.getnumsnapshots());
	}
}

//take a snapshot at the current index
function snapshot() {
	if (snapshotapi) {
		if (arguments.length == 1) {
			outlet(0, snapshotapi.snapshot(arguments[0]));
		} else if (arguments.length == 2) {
			outlet(0, snapshotapi.snapshot(arguments[0], arguments[1]));
		} else if (arguments.length == 3) {
			outlet(0, snapshotapi.snapshot(arguments[0], arguments[1], arguments[2]));
		} else {
			outlet(0, snapshotapi.snapshot());
		}
	}
}

//append (no arguments) or add a snapshot at the given index
function addsnapshot() {
	if (snapshotapi) {
		if (arguments.length == 1) {
			outlet(0, snapshotapi.addsnapshot(arguments[0]));
		} else if (arguments.length == 2) {
			outlet(0, snapshotapi.addsnapshot(arguments[0], arguments[1]));
		} else if (arguments.length == 3) {
			outlet(0, snapshotapi.addsnapshot(arguments[0], arguments[1], arguments[2]));
		} else {
			outlet(0, snapshotapi.addsnapshot());
		}
	}
}

//restore a snapshot at the given index
function restore() {
	if (snapshotapi) {
		if (arguments.length == 1) {
			outlet(0, snapshotapi.restore(arguments[0]));
		} else if (arguments.length == 2) {
			outlet(0, snapshotapi.restore(arguments[0], arguments[1]));
		} else {
			outlet(0, snapshotapi.restore());
		}
	}
}

//delete a snapshot at the given index
function deletesnapshot() {
	if (snapshotapi) {
		if (arguments.length == 1) {
			outlet(0, snapshotapi.deletesnapshot(arguments[0]));
		} else if (arguments.length == 2) {
			outlet(0, snapshotapi.deletesnapshot(arguments[0], arguments[1]));
		} else {
			outlet(0, snapshotapi.deletesnapshot());
		}
	}
}

function exportsnapshot() {
	if (snapshotapi) {
		if (arguments.length == 1) {
			outlet(0, snapshotapi.exportsnapshot(arguments[0]));
		} else if (arguments.length == 2) {
			outlet(0, snapshotapi.exportsnapshot(arguments[0], arguments[1]));
		}
	}	
}

function importsnapshot() {
	if (snapshotapi) {
		if (arguments.length == 1) {
			outlet(0, snapshotapi.importsnapshot(arguments[0]));
		} else if (arguments.length == 2) {
			outlet(0, snapshotapi.importsnapshot(arguments[0], arguments[1]));
		}
		else {
			outlet(0, snapshotapi.importsnapshot());
		}
	}		
}
	
function exportallsnapshots() {
	if (snapshotapi && arguments.length == 1) {
		var numsnapshots = snapshotapi.getnumsnapshots();
		for (var i = 0; i < numsnapshots; i++) {
			var snapshotname = snapshotapi.getsnapshotname(i);
			snapshotname = i + "_" + snapshotname + ".maxsnap";
			snapshotname = arguments[0] + snapshotname;
			snapshotapi.exportsnapshot(i, snapshotname);
		}
	}
}

//get the snapshot name at the given index
function getsnapshotname(position) {
	if (snapshotapi) {
		outlet(0, snapshotapi.getsnapshotname(position));
	}
}

//set the snapshot name at the given index
function setsnapshotname(position, snapshotname) {
	if (snapshotapi) {
		outlet(0, snapshotapi.setsnapshotname(position, snapshotname));
	}
}

//query the 'embed' state of a snapshot. returns 1 if the snapshot at the index is embedded, 0 if not
function getembedsnapshot(position) {
	if (snapshotapi) {
		outlet(0, snapshotapi.getembedsnapshot(position));
	}
}

//set the embed state of the snapshot at the index
function setembedsnapshot(position, value) {
	if (snapshotapi) {
		outlet(0, snapshotapi.setembedsnapshot(position, value));
	}
}

//change a snapshot's index
function movesnapshot(position, newposition) {
	if (snapshotapi) {
		outlet(0, snapshotapi.movesnapshot(position, newposition));
	}
}
