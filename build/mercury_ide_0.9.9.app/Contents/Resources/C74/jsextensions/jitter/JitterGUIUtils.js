//
// JitterGUIUtils -- classes for managing 3D UI objects.
//
// author: rej@2uptech.com

var JitterGUIUtils = new JitterGUIUtilsInterface();


// ----------------------------------------------------------------
// JitterGUIUtilsInterface
// public interface for multiple JitterGUITrackers.  One and
// only one is made for a given render destination when needed.
 
// constructor.  
//
function JitterGUIUtilsInterface()
{
	this.trackers = new Array();
}

// add tracker for a given destination.
//
JitterGUIUtilsInterface.prototype.add_tracker = function(dest)
{
	if (this.trackers[dest] == undefined)
	{
		this.trackers[dest] = new JitterGUITracker(dest);
	}
}

// init tracker for a given destination.
//
JitterGUIUtilsInterface.prototype.init = function(dest)
{
	this.trackers[dest].make_listener();
}

JitterGUIUtilsInterface.prototype.add_client = function(dest, newclient)
{
	this.trackers[dest].add_client(newclient);
}

JitterGUIUtilsInterface.prototype.delete_bogus_clients = function(dest)
{
	this.trackers[dest].delete_bogus_clients();
}

// ----------------------------------------------------------------
// JitterGUITracker 
// data and interface are considered private.
// arbitrates between subclasses of JitterGUIElement on a given
// render destination.  

// constructor.  
//
function JitterGUITracker(dest)
{
	this.destination = dest;

	// make new sketch object for screen/world coordinate translation
	this.sketch = new JitterObject("jit.gl.sketch", dest);
	this.clients = new Array();
}

// make a new listener if needed.  otherwise just set destination.
//
JitterGUITracker.prototype.make_listener = function()
{	
	if (this.listener == undefined)
	{
		this.listener = new JitterListener(this.destination, jgt_callbackfun);
	}
	this.listener.subjectname = this.destination;
}


JitterGUITracker.prototype.add_client = function(newclient)
{
	this.delete_duplicate_clients(newclient);
	this.clients.push(newclient);	
}


// called when adding a new client.  delete any old clients matching new one.
//
JitterGUITracker.prototype.delete_duplicate_clients = function(newclient)
{
	var client;
	
	for(var i=0; i<this.clients.length; i++)
	{
		client = this.clients[i];		
		
		if (client.maxobj != undefined)
		{
			if (client.maxobj == newclient.maxobj) 
			{
				if ((client.unique_index == undefined)
					|| (client.unique_index == newclient.unique_index))
				{
					this.clients.splice(i, 1);
					i--;
				}
			}			
		}
	}
}


//	call before handling events.  delete any clients which have been deleted in the patcher.
//
JitterGUITracker.prototype.delete_bogus_clients = function()
{
	var indexedobj, prevobj;
	
	for(var i=0; i<this.clients.length; i++)
	{
		indexedobj = this.clients[i];		
		if (indexedobj.delete_me == true)	
		{
			this.clients.splice(i, 1);
			i--;
		}
	}
}


// jgt_callbackfun called with mouse events on destination by JitterListener. 
// get intersections of event with clients, then send event to client with
// frontmost intersection, or clients which are marked unblockable.
//
function jgt_callbackfun(event)
{
	var raystart, rayend;
	var camvec = new Array();
	var camera = new Array();
	var allpoints = new Array();
	var intersectpoints = new Array();
	var n_intersects, n_stilldowns;	
	var dest = event.subjectname;
	var clientsprop = dest+"_clients";
	var tracker = JitterGUIUtils.trackers[dest];
	var sketch = tracker.sketch;
	var mousedown;

	// get start and end points of the mouse click in world coordinates
	// screen to world uses normalized z relative to camera:
	// 0. = closest to camera, 1. = furthest from camera
	//
	camera = sketch.getcamera();	
	raystart = sketch.screentoworld(event.args[0], event.args[1], 0.);	
	rayend = sketch.screentoworld(event.args[0], event.args[1], 1.);		
	mousedown = event.args[2];
	
	// get intersection points
	intersectpoints.length = 0;
	n_intersects = 0;
	n_stilldowns = 0;
	var numclients = tracker.clients.length;
	
	// get intersect points and stilldowns
	for (var i=0; i<numclients; i++)
	{
		allpoints[i] = new Array();		
		// store previous intersect state
		allpoints[i].prev_intersect = tracker.clients[i].intersect;
		allpoints[i].intersect = 0;

		if (tracker.clients[i].get_intersect(raystart, rayend, allpoints[i]))
		{
			allpoints[i].intersect = 1;
			intersectpoints[n_intersects] = allpoints[i];
			intersectpoints[n_intersects].client = tracker.clients[i];
			n_intersects++;
		}
		n_stilldowns += tracker.clients[i].stilldown;		
	}
	
	// any stilldowns keep focus, prevent other elements from working
	if (n_stilldowns)
	{
		for (var i=0; i<numclients; i++)
		{
			if (tracker.clients[i].stilldown)
			{
				tracker.clients[i].handle_event(event);
			}
		}
	}
	
	// handle intersect events.
	if (n_intersects)
	{
		// get distances from camera
		for (var i=0; i<n_intersects; i++)
		{
			Jitter3DUtils.vsub(intersectpoints[i], camera, camvec);
			intersectpoints[i].distance = Jitter3DUtils.vlength2(camvec);
		}
		intersectpoints.sort(pointsort_dist);	
		
		// handle unblockable clients
		for (var i=0; i<n_intersects; i++)
		{			
			if (intersectpoints[i].client.unblockable)
			{
				intersectpoints[i].client.handle_event(event);
			}
		}
		
		// handle frontmost intersect
		if (!intersectpoints[0].client.unblockable)
		{
			if (!n_stilldowns || intersectpoints[0].client.stilldown)
				intersectpoints[0].client.handle_event(event);

		}
	}

	// handle mouseidleouts.  we only need this code if we care about tracking rollovers. 
	if (!n_stilldowns || !mousedown)
	{
		for (var i=0; i<numclients; i++)
		{			
			var do_mouseout;
			tracker.clients[i].was_frontmost = tracker.clients[i].frontmost;
			if (n_intersects)
			{
				tracker.clients[i].frontmost = (intersectpoints[0].client == tracker.clients[i]);
			}
			else
			{
				tracker.clients[i].frontmost = 0;
			}
			
			if (tracker.clients[i].unblockable)
			{
				do_mouseout = (allpoints[i].prev_intersect && !allpoints[i].intersect);
			}
			else
			{
				do_mouseout = (tracker.clients[i].was_frontmost && !tracker.clients[i].frontmost);
			}
			
			if (do_mouseout)
			{
				event.eventname = "mouseidleout";
				tracker.clients[i].handle_event(event);		
			}
			
			if (tracker.clients[i].frontmost && !tracker.clients[i].was_frontmost)
			{
				event.eventname = "mouseidle";
				tracker.clients[i].handle_event(event);		
			}	
		}
	}
}

jgt_callbackfun.local = 1;


// sort intersection points by z order
// needs precomputed distances!
//
function pointsort_dist(pa, pb)
{
	if(pa.distance > pb.distance)
	{
		return 1.
	}
	else if (pa.distance < pb.distance)
	{
		return -1;
	}
	else
	{
		return 0;
	}
}


// ----------------------------------------------------------------
// JitterGUIElement
//
// subclass this to make a UI object.  


// JitterGUIElement constructor.  called with the max object which 
// is making us, so that we can get rid of duplicate objects.
//
function JitterGUIElement(mobj)
{
	this.maxobj = mobj;
}

// free our jitter object.  called by notifydeleted() function in js.
//
JitterGUIElement.prototype.free = function()
{
	this.delete_me = true;
	JitterGUIUtils.delete_bogus_clients(this.destination);
	this.jitterobj.freepeer();
}

// set the drawing destination.
//
JitterGUIElement.prototype.init = function(destination)
{
	this.jitterobj = new JitterObject("jit.gl.sketch");
	this.destination = destination;
	this.localint = new Array();
	this.worldint = new Array();
	this.delete_me = 0;
	this.unblockable = 0;	// set true to get events even if we are behind another object
	this.frontmost = 0;
	this.was_frontmost = 0;
	this.intersect = 0;
	this.stilldown = 0;
	this.highlight = 0;
	this.val = 0.;
	
	this.drawto(destination);

	// if our max object is created before the tracker's max obj, we need
	// to make the tracker ourselves. 
	JitterGUIUtils.add_tracker(destination);
	JitterGUIUtils.init(destination);
	
	// add self to tracker clients for destination
	JitterGUIUtils.add_client(destination, this);
	this.update();
}

// adding the unique_index property allows one js instance
// to own multiple JitterGUIElements
JitterGUIElement.prototype.set_unique_index = function(k)
{
	this.unique_index = k;
};


JitterGUIElement.prototype.drawto = function(destination)
{
	this.jitterobj.drawto = destination;
};

JitterGUIElement.prototype.update = function()
{
	post ("override update method of JitterGUIElement to draw.\n");
};


// return the intersection of the unit quad in world space
// with the line defined by raystart and rayend.  pass intersect in world coordinates 
// back to the caller in p1.  stores local and world intersections locally.
//
JitterGUIElement.prototype.get_intersect = function(raystart, rayend, p1)
{
	this.intersect = Jitter3DUtils.intersect_line_quad(raystart, rayend, this.jitterobj.position, 
		this.jitterobj.rotate, this.jitterobj.scale, this.worldint, this.localint);
		
	Jitter3DUtils.vcopy(this.worldint, p1);
	
	return this.intersect;
};


// handle a UI event.
//
JitterGUIElement.prototype.handle_event = function(event)
{
	post ("override handle_event method of JitterGUIElement to handle events.\n");
};


// parse jitter-style js arguments.
// if attr name is a property of JitterGUIElement, set the property.
// otherwise set attribute of our jitter object.
//
JitterGUIElement.prototype.set_attr_args = function(args)
{
	var attrname;
	var s;
	var attrvals;
	var j = 0;
	var done;
	for(var i=0; i<args.length; i++)
	{	
		s = args[i];
		if (typeof s == "string")
		{
			if(s.charAt(0) == "@")
			{
				attrname = s.substr(1, args[i].length);
				i++;
				j = 0;
				attrvals = new Array();
				for(done=0; !done;)
				{
					s = args[i];
					if (typeof s == "string") 
					{
						if (s.charAt(0) == "@") 
						{
							done = 1;
							i--;
						}
					}
					if (!done)
					{
						attrvals[j] = s;
						i++;
						j++;
					}
					if (i > args.length-1) done = 1;
				}
				if (this[attrname] == undefined)
				{
					this.jitterobj[attrname] = attrvals;
				}
				else
				{
					this[attrname] = attrvals;
				}
			}
		}
	}
}

function postprops(p)
{
	var r;
	for (r in p)
	{
		post (r, ":", p[r], "\n");
	}
}