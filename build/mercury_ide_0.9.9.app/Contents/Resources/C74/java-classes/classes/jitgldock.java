import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.util.*;

// created by bbn on Mar 3, 2005
/**
 * a circular dock-like ui element 
 * that interfaces with an instance 
 * of the matrixlist class to get its images
 * 
 * @author bbn
 */
public class jitgldock extends MaxObject implements JitterNotifiable 
{
	private class icondata
	{
		public JitterObject gshape = null;
		public float center[] = new float[] {0.f,0.f};
		public float corner[] = new float[] {0.f,0.f,0.f,0.f};
		public JitterMatrix textureMatrix = null;
		public String textureName = null;
		public float rotatexyz[] = null;   //this is in degrees
		public boolean flipping = false;
		public double flipangle = 0.0;   // this is in degrees
	}
	private icondata icon[] = null;

	private final JitterObject render;
	private final JitterListener listener;
	private final MaxQelem mouseQ = new MaxQelem(this, "notifyQfn");
	private final MaxClock flipClock = new MaxClock(this, "flipTick");
	private boolean clockIsActive = false;
	private static final double flipInterval = 50.0;
	private static final double flipTime = 1000.0;
	private static final double flipAngleIncrement = 360.0/(flipTime/flipInterval);
	private JitterEvent mostRecentEvent;
	
	//	used to prevent texture name collisions between different instances of gldock
	private static int globalTextureNumber = 0;  
	private static String globalTextureName = "jitgldocktexture";
	
	private String matrixlistName = null;
	private int size = 0;
	private double planez = 0.0;
	private double radius = 1.0;
	private double magnification = 1.0;
	private double magnificationExponent = 2.0;
	private double phi = 0.0; 
	private String context = null;
	private boolean requireindividualclicks = false;
	private boolean mouseDown = false;
	
	private static final float cameraz = 3.5f;
	private static final float zDrop = 0.01f;

	public jitgldock(Atom[] a) 
	{
		if (a.length < 2)
		{
			bail("jitgldock: must supply the name of a matrixlist as an argument.");
			render = null;
			listener = null;
			return;
		}
		context = a[0].toString();
		matrixlistName = a[1].toString();
		declareAttribute("magnification");
		declareAttribute("magnificationExponent");
		declareAttribute("planez");
		declareAttribute("radius");
		declareAttribute("requireindividualclicks");
		
		// create our render object for our context
		render = new JitterObject("jit.gl.render",new Atom[]{a[0]});
		render.setAttr("camera",new float[] {0.f,0.f,cameraz});
		render.send("quads");
		render.send("depth_enable", 1);
		render.send("lighting_enable",0);
		render.send("blend_enable",0);
		render.send("erase_color", new float[] {1.f,1.f,1.f,1.f});
			
		// build our listener
		listener = new JitterListener(context,this);
	}
	
	public void populate() 
	{
		ArrayList matrices = null;
		if ( ((matrices = findmatrixlist(matrixlistName)) != null) 
			&& ((size = matrices.size()) > 0) )
		{		
			freePeers(icon);
			icon = new icondata[size];
			for (int i=0;i<size;i++) {
				icon[i] = new icondata();
				icon[i].textureMatrix = new JitterMatrix(4, "char", new int[] {64,64});
				icon[i].textureMatrix.frommatrix((JitterMatrix)matrices.get(i));
				icon[i].textureName = globalTextureName + 
										(new Integer(globalTextureNumber++)).toString();
				render.send("texture", 	new Atom[] {Atom.newAtom(icon[i].textureName),
													Atom.newAtom("jit_matrix"),
													Atom.newAtom(icon[i].textureMatrix.getName())});
				render.send("interp", 0);
				
				icon[i].gshape = new JitterObject("jit.gl.gridshape", 
													new Atom[] {Atom.newAtom(context)});
				icon[i].gshape.send("shape","plane");
				icon[i].gshape.send("texture", icon[i].textureName);
				icon[i].gshape.send("depth_enable", 1);
				icon[i].gshape.send("lighting_enable",0);
				icon[i].gshape.send("blend_enable",0);
				//we have to set the vertex color to full brightness
				//or else the texture color is dulled
				icon[i].gshape.send("color", new float[] {1.f,1.f,1.f,1.f});
				float rotatez = (float)((double)i*360.0/(double)size) + 90.0f;
				if (rotatez > 360.0) rotatez -= 360.0;
				icon[i].rotatexyz = new float[] {0.0f, 0.0f, rotatez};
				icon[i].gshape.send("rotatexyz", icon[i].rotatexyz);
			}
			arrangeIcons(icon, 0, 0.0);
		}
	}
	
	//respond to mouse movement
	//use an usurping qelem to not backlog mouse events
	public void notify(JitterEvent e)
	{
		mostRecentEvent = e;
		mouseQ.set();  //calls notifyQfn
	}
	
	private void notifyQfn()
	{
		if (size == 0)
			return;
		String subjectname = mostRecentEvent.getSubjectName();
		String eventname = mostRecentEvent.getEventName();
		Atom args[] = mostRecentEvent.getArgs();
		if (eventname.equals("mouseidle"))
			respondToMouseIdle(args[0].toInt(), args[1].toInt());
		else if (eventname.equals("mouse"))  //click
			respondToMouseClick(args[0].toInt(), args[1].toInt());
		else if (eventname.equals("mouseidleout"))  //mouse has exited the window
			respondToMouseExit();
		//else post(eventname);
		}
	
	private void respondToMouseIdle(int pixelX, int pixelY)
	{
		mouseDown = false;
		double planexy[] = calcPlaneXY(pixelX, pixelY, planez);
		double r = calcR(planexy[0], planexy[1]);
		double theta = calcTheta(planexy[0], planexy[1]);		
		arrangeIcons(icon, theta, r);
	}
	
	private void respondToMouseExit()
	{
		arrangeIcons(icon, 0.0, 0.0);
	}
	
	private void respondToMouseClick(int pixelX, int pixelY)
	{
		double planexy[] = calcPlaneXY(pixelX, pixelY, planez);
		double r = calcR(planexy[0], planexy[1]);
		double theta = calcTheta(planexy[0], planexy[1]);	
		arrangeIcons(icon, theta, r);
		
		if (requireindividualclicks)
			if (mouseDown)
				return;
			
		mouseDown = true;
		
		int closestIndex = closestIndex(theta, icon.length);
		startFlip(icon[closestIndex]);
		output(closestIndex);
	}
	
	private void startFlip(icondata ic)
	{
		ic.flipping = true;
		if (!clockIsActive) {
			clockIsActive = true;
			flipClock.delay(flipInterval);
		}
	}

	private void flipTick() 
	{
		boolean keepFlipping = false;
		for (int i=0;i<icon.length;i++)
		{
			if (icon[i].flipping)
			{
				icon[i].flipangle += flipAngleIncrement;
				if (icon[i].flipangle >= 360.0) {
					icon[i].flipangle = 0.0;
					icon[i].flipping = false;
				} else {
					keepFlipping = true;
				}
				icon[i].rotatexyz[0] = (float)(icon[i].flipangle);
				icon[i].gshape.send("rotatexyz", icon[i].rotatexyz);
			}
		}
		if (keepFlipping) 
			flipClock.delay(flipInterval);
		else
			clockIsActive = false;
	}
	
	private int closestIndex(double theta, int numElements)
	{
		int val =(int)(((double)numElements*theta)/ (Math.PI*2.0)+0.5);
		if (val >= numElements)
			val = 0;
		return val;
	}
	
	private void arrangeIcons(icondata ic[], double theta, double r)
	{
		double radialDistanceFromCircle = Math.abs(1.0-r); 
		double rMagnification = radialDistanceFromCircle*(1.0-magnification) +magnification;
		
		//int closestIndex = closestIndex(theta, ic.length);
		int firstIndex = closestIndex(theta, ic.length);
		//int firstIndex = closestIndex + ic.length/2;
		//if (firstIndex >= ic.length)
		//	firstIndex -= ic.length;
		
	//	double oppositeTheta = (theta > Math.PI)?(theta-Math.PI):(theta+Math.PI);
	//	int firstIndex = (int)(oppositeTheta/(Math.PI*2.0) * (double)(ic.length) +(1.0/3.0));
	//	if (firstIndex == ic.length) firstIndex = 0;
		int count = 0;
		double z = 0.0;
		final double zDecrement = zDrop;
		placeIcon(ic, firstIndex, theta, rMagnification, z);
		count++;
		int upIndex = firstIndex;
		int downIndex = firstIndex;
		while (count < ic.length) 
		{
			z-= zDecrement;
			if (++upIndex >= ic.length) upIndex = 0;
			if (--downIndex < 0) downIndex = ic.length-1;
			placeIcon(ic, upIndex, theta, rMagnification, z);
			count++;
			z-= zDecrement;
			if (count < ic.length)
				placeIcon(ic, downIndex, theta, rMagnification, z);
			count++;
		}
		
	}
	
	private void placeIcon(icondata ic[], int i, double theta, double rMagnification, double z)
	{
		double rotangle = (double)i*Math.PI*2.0/(double)ic.length;
		double delta = rotangle - theta; 
		if (delta > Math.PI)
			delta -= Math.PI*2.0;
		else if (delta < -Math.PI)
			delta += Math.PI*2.0;
		ic[i].gshape.send("scale", scaleVector(ic.length, rMagnification, delta));
		ic[i].gshape.send("position", positionVector(ic.length, rotangle, delta, rMagnification, z));	
	}
	
	private float[] scaleVector(int howMany, double magnification, double delta)
	{
		float scalefactor=(float)(Math.pow((Math.abs(delta)/Math.PI), 1.0/magnificationExponent) * (1.0 - magnification) + magnification)/(float)howMany;
		return new float[] {scalefactor, scalefactor, 0.01f};
	}
	
	private float[] positionVector(int howMany, double theta, double delta, double mag, double z) 
	{
		//TODO theta shift?
		double thistheta = theta;// - delta*0.1;
		//the boxes right next to the "theta" box have the biggest shift
		//the others trail towards zero as abs(delta) -> pi
		
		float pos[] = new float[3];
		pos[0] = (float)Math.cos(thistheta);
		pos[1] = (float)Math.sin(thistheta);
		pos[2] = (float)z;
		return pos;
	}

	public void bang()
    {
		render.send("erase");	
		render.send("drawclients");
		render.send("swap");
    }
	/*
	private void spin()
	{
		for (int i=0;i<gshape.length;i++)
			if (spinning[i]==1)
			{
				spinangle[i] += spinIncrement;
				gshape[i].send("rotate", yada yada );
				if (spinangle[i] >= )
			}
	}
	*/

	public void output(int i) {
		ArrayList al = findmatrixlist(matrixlistName);
		if ((al != null) && (i<al.size())) {
			JitterMatrix j = (JitterMatrix)(al.get(i));
			outlet(0, "jit_matrix", j.getName());			
		}
	}
	
	/* free max peers. otherwise these will persist for a while
	 until the garbage collector feels like cleaning up 
	*/
	protected void notifyDeleted()
	{
		flipClock.unset();
		freePeers(icon);
		render.freePeer();
	}
	
	private void freePeers(icondata ic[])
	{
		if (ic != null) {
			for (int i=0;i<ic.length;i++) {
				if (ic[i].gshape != null)
					ic[i].gshape.freePeer();
		
			}
		}
	}
	
	private ArrayList findmatrixlist(String s) 
	{
		ArrayList m = matrixlist.findName(s);
		if (m==null) 
			error("jitgldock: name supplied as an argument is not associated with a matrixlist");
		return m;		
	}
	
	//finds the (x,y) ray intersection of the mouse at a given z value
	private double[] calcPlaneXY(int windowX, int windowY, double zvalue)
	{
		Atom a[] = render.send("screentoworld", new float[] {(float)windowX, (float)windowY, 0.0f});
		double closest[] = new double[] {a[0].toDouble(), a[1].toDouble(), a[2].toDouble()};
		a = render.send("screentoworld", new float[] {(float)windowX, (float)windowY, 1.0f});
		double farthest[] = new double[] {a[0].toDouble(), a[1].toDouble(), a[2].toDouble()};
		//where does this ray intersect our plane?
		double zfactor = (zvalue - closest[2])/(farthest[2]-closest[2]);
		double planexy[] = new double[2];
		for (int i=0;i<2;i++)
			planexy[i] = (farthest[i] - closest[i]) * zfactor;
		return planexy;
	}	
	
	private double calcR(double x, double y)
	{
		return Math.sqrt(x*x+y*y);
	}
	
	//returns theta between 0 and 2pi
	private double calcTheta(double x, double y)
	{
		double theta;
		if (x != 0.0)
		{
			theta = Math.atan(y/x);
			//inverse tangent calc always assumes quad 1 or 4, so compensate:
			switch (quadrant(x,y)) {
				case 1: break;
				case 2: theta += Math.PI; break;
				case 3: theta += Math.PI; break;
				case 4: theta += Math.PI*2.0; break;
			}
		} else {
			if (y >= 0.0)
				theta = Math.PI * 0.5;
			else
				theta = Math.PI * 1.5;
		}
		return theta;
	}

	/*	which quadrant is (x,y) in? 
	 * 2 | 1
	 * --+--
	 * 3 | 4
	 * */
	private int quadrant(double x, double y)
	{
		if (y > 0.0) {
			if (x >= 0.0)
				return 1;
			else
				return 2;
		} else {
			if (x < 0.0)
				return 3;
			else
				return 4;
		}
	}
}
