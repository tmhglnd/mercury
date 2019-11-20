import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.util.*;

// Created on 1-Dec-2005

/**
 * @author bbn
 *
 * dynamically created geometry that slowly fades away.
 */
public class JitterFadingGeometry extends MaxObject implements Executable {

	public ArrayList FadingObjects = new ArrayList();
	private MaxClock clock = new MaxClock(this);
	public ArrayList shapes = new ArrayList();
	private boolean clockIsRunning= false;

	public String context = null;
	public float duration = 1000.0f; // duration in milliseconds
	public float interval = 10.0f;   // interval of fading clock
	public String shape = "sphere";
	public float color[] = new float[] {1.0f,1.0f,1.0f,1.0f};
	public float position[] = new float[] {0.f,0.f,0.f};
	public float scale[] = new float[] {1.f,1.f,1.f};
	public float rotate[] = new float[] {0.f,0.f,0.f,0.f};
	
	JitterFadingGeometry() {
		bail("JitterFadingGeometry: must give a context name as an argument");
	}
	
	JitterFadingGeometry(String context) {
		this.context = context;
		declareAttribute("context");
		declareAttribute("duration");
		declareAttribute("interval");
		declareAttribute("shape");
		declareAttribute("color");
		declareAttribute("position");
		declareAttribute("scale");
		declareAttribute("rotate");
	}
	
	public void newobject() 
	{
		FadingObj newfo = new FadingObj(context, duration, shape, color, position, scale, rotate); 
		
		//determine where the new object should be inserted in the ArrayList
		//elements are kept sorted by expirytime
		Iterator i = FadingObjects.iterator();
		int index = 0;
		while (i.hasNext())
		{
			FadingObj fo = (FadingObj)i.next();
			if (fo.expirytime > newfo.expirytime)
				break;
			index++;
		}
		FadingObjects.add(index,newfo);
		
		if (!clockIsRunning)
		{
			clockIsRunning = true;
			clock.delay(interval);
		}
	}
	
	public void execute() {
		double currentTime = MaxSystem.sysTimerGetTime();
		deleteExpiredObjects(currentTime);
		if (FadingObjects.size() != 0)
		{
			fadeColors(currentTime);
			clock.delay(interval);
		}
		else clockIsRunning = false;
	}
	
	private void deleteExpiredObjects(double currentTime)
	{
		while ((FadingObjects.size() > 0) 
				&& (((FadingObj)FadingObjects.get(0)).hasExpired(currentTime)))	
		{
			((FadingObj)FadingObjects.get(0)).prepareForDeletion();
			FadingObjects.remove(0);
		}
	}
	
	private void fadeColors(double currentTime)
	{
		Iterator i = FadingObjects.iterator();
		while (i.hasNext())
		{
			((FadingObj)i.next()).adjustColor(currentTime);
		}
	}
	
	protected void notifyDeleted()
	{
		Iterator i = FadingObjects.iterator();
		while (i.hasNext())
		{
			((FadingObj)i.next()).prepareForDeletion();
		}
	}

	//////////////////////////////////////////////////////////////////////////
	private class FadingObj {
		JitterObject jo = null;
		double expirytime = 0;
		double duration = 0;
		float color[] = null;
		
		FadingObj(String context, double duration, String shape, float color[],
								float pos[], float scale[], float rotate[])
		{
			jo = new JitterObject("jit.gl.gridshape", context);
			jo.setAttr("blend_enable", 1);
			jo.setAttr("depth_enable", 1);
			jo.send("shape", shape);
			jo.send("color", color);
			jo.send("position", position);
			jo.send("scale", scale);
			jo.send("rotate", rotate);
			expirytime = MaxSystem.sysTimerGetTime() + (double)duration; 
			this.duration = duration;
			this.color = color;
		}
		
		public boolean hasExpired(double time)
		{
			if (time > expirytime)
				return true;
			else
				return false;
		}
		
		public void adjustColor(double time)
		{
			//linear alpha fade over duration
			float fade = (float)((expirytime - time) / duration);
			float newcolor[] = new float[] {color[0], color[1], color[2], color[3]*fade};
			jo.send("color", newcolor);
			newcolor = null;
		}
		
		public void prepareForDeletion()
		{
			jo.freePeer();
		}
	}
}
