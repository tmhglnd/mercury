// Created on 31-Aug-2005
import com.cycling74.max.*;
import com.cycling74.jitter.*;


import java.util.*;

/**
 * @author bbn
 *
 * Every context within the environment gets its own tracker.  
 * Trackers are shared between multiple gui objects that exist in the same context.
 */
public class JitterGuiTracker implements JitterNotifiable {
		
	String destination = null;
	JitterObject sketch = null;  
	ArrayList clients = new ArrayList();
	JitterListener listener = null;
	
	public JitterGuiTracker(String dest) 
	{
		destination = dest;
		sketch = new JitterObject("jit.gl.sketch", dest);
	}
	
	protected void makeListener()
	{
		if (listener == null)
			listener = new JitterListener(destination, this);
	}
	
	protected void addClient(JitterGuiElement newclient)
	{
		deleteDuplicateClients(newclient);
		clients.add(newclient);
	}
	
	private void deleteDuplicateClients(JitterGuiElement newclient)
	{
		JitterGuiElement client;
		Iterator it = clients.iterator();
		while (it.hasNext())
		{
			client = (JitterGuiElement)it.next();
			if (client.maxobj != null)
			{
				if (client.maxobj == newclient.maxobj)
				{
					if ((client.uniqueIndex == 0)
							|| (client.uniqueIndex == newclient.uniqueIndex))
					{
						//this.clients.splice(i,1); -- what does this piece of JS code do?
						it.remove();
					}
				}
			}
		}
	}
	
	public void deleteBogusClients()
	{
		Iterator it = clients.iterator();
		while (it.hasNext())
		{
			JitterGuiElement e = (JitterGuiElement)it.next();
			if (e.deleteMe == true)
				it.remove();
		}
	}
	
	public void notify(JitterEvent event) 
	{
		//get start and end points of the mouse click in world coordinates
		// screen to world uses normalized z relative to camera:
		// 0. = closest to camera, 1. = furthest from camera
		int eventargs[] = event.getArgsIntArray();
		if (eventargs.length >= 2) 
		{ //otherwise it is a window update, or resize
			
			float camera[] = Atom.toFloat(sketch.send("getcamera"));			
			float camvec[] = new float[3];
			float tempcoords[] = new float[] {(float)eventargs[0], (float)eventargs[1], 0.f};
			float raystart[] = Atom.toFloat(sketch.send("screentoworld", tempcoords));
			tempcoords[2] = 1.f;
			float rayend[] = Atom.toFloat(sketch.send("screentoworld",tempcoords));
			boolean mousedown = (eventargs[2] == 1);
			
			// get intersect points and stilldowns
			ArrayList intersectpoints = new ArrayList();
			ArrayList allpoints = new ArrayList();
			int nStilldowns = 0;
			JitterGuiElement frontmost = null;
			Iterator it = clients.iterator();
			while (it.hasNext())
			{
				JitterGuiIntersection i = new JitterGuiIntersection();
				allpoints.add(i);
				JitterGuiElement e = (JitterGuiElement)it.next();
				i.prevIntersect = e.intersect;
				i.intersect = false;
				if (e.getIntersect(raystart, rayend, i.where))
				{
					i.intersect = true;
					intersectpoints.add(i);
					i.element = e;
				}
				nStilldowns += (e.stilldown?1:0);
			}
			
			// any stilldowns keep focus, prevent other elements from working	
			if (nStilldowns > 0)
			{
				it = clients.iterator();
				while (it.hasNext())
				{
					JitterGuiElement e = (JitterGuiElement)it.next();
					if (e.stilldown)
					{
						e.handleEvent(event);
					}
				}
			}
			
			// handle intersect events.	
			if (intersectpoints.size() > 0)
			{
				//get distances from camera
				it = intersectpoints.iterator();
				while (it.hasNext())
				{
					JitterGuiIntersection i = (JitterGuiIntersection)it.next();
					Jitter3DUtils.vsub(i.where, camera, camvec);
					i.distance = Jitter3DUtils.vlength2(camvec);
				}
				
				Collections.sort(intersectpoints);
				frontmost = ((JitterGuiIntersection)intersectpoints.get(0)).element;
				
				//handle unblockable clients
				it = intersectpoints.iterator();
				while (it.hasNext())
				{
					JitterGuiIntersection i = (JitterGuiIntersection)it.next();
					if (i.element.unblockable)
					{
						i.element.handleEvent(event);
					}
				}
				
				//handle frontmost intersect
				if (!frontmost.unblockable)
				{
					if ((nStilldowns == 0)||(frontmost.stilldown))
						frontmost.handleEvent(event);
				}
			}
			
			//handle mouseidleouts.  we only need this code
			//if we care about tracking rollovers.
			if ((nStilldowns == 0)||(!mousedown))
			{
				it = clients.iterator();
				Iterator it2 = allpoints.iterator();
				while (it.hasNext())
				{
					boolean doMouseout;
					JitterGuiElement e = (JitterGuiElement)it.next();
					JitterGuiIntersection ai = (JitterGuiIntersection)it2.next();
					e.wasFrontmost = e.frontmost;
					if (intersectpoints.size() > 0)
						e.frontmost = (e == frontmost);
					else
						e.frontmost = false;
					
					if (e.unblockable)
						doMouseout = ((ai.prevIntersect)&&(!ai.intersect));
					else
						doMouseout = ((e.wasFrontmost)&&(!e.frontmost));
					
					if (doMouseout)
					{
						event.setEventName("mouseidleout");
						e.handleEvent(event);
					}
					
					if ((e.frontmost) && (!e.wasFrontmost))
					{
						event.setEventName("mouseidle");
						e.handleEvent(event);
					}				
				}
			} 
		}
	}
}
