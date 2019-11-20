// Created on 3-Sep-2005
import com.cycling74.max.*;
import com.cycling74.jitter.*;

/**
 * @author bbn
 *
 * gui slider
 */
public class JitterGuiSliderElement extends JitterGuiElement {
	
	boolean prevdown = false;
	boolean mousedown = false;
	float val = 0.f;
	float color[] = new float[] {1.0f,1.0f,1.0f,1.0f};
	float position[] = new float[] {0.0f,0.0f,0.0f};
	float rotate[] = new float[] {0.0f,0.0f,0.0f};
	float scale[] = new float[] {1.0f,1.0f,1.0f};
	Callback c=null;

	public JitterGuiSliderElement(MaxObject mo, Callback c)
	{
		super(mo);
		this.c = c;
	}
	
	public void update()
	{
		//JitterObject jo, an instance of jit.gl.sketch, is created in element class
		jo.send("reset");
		if (highlight)
			jo.send("glcolor", new float[] {1.f,1.f,1.f,1.f});
		jo.send("framequad", new float[] {0.f,0.f,0.f,0.f,1.f,0.f,1.f,1.f,0.f,1.f,0.f,0.f});
		if (highlight)
			jo.send("glcolor", color);		
		jo.send("quad", new float[] {0.f,0.f,0.f,0.f,val,0.f,1.f,val,0.f,1.f,0.f,0.f});
	}
	
	public void handleEvent(JitterEvent event)
	{
		boolean oldhighlight = highlight;
		float oldval = val;
		Atom args[] = event.getArgs();
		
		String eventname = event.getEventName();
		if (eventname.equals("mouse"))
		{
			//event arguments are (x,y,button,cmd,shift,capslock,option,ctrl)
			boolean button = args[2].toBoolean();
			prevdown = mousedown;
			mousedown = button;
			
			//set stilldown
			if (intersect)
				stilldown = mousedown && prevdown;
			else
				stilldown = stilldown && mousedown;
			
			if ((intersect && mousedown) || stilldown)
			{
				val = (float)Math.max(Math.min(localint[1],1.), 0.);
				c.execute();
			}
		}
		else if (eventname.equals("mouseidle"))
		{
			highlight = true;
		}
		else if (eventname.equals("mouseidleout"))
		{
			highlight = false;
		}
		
		if ((highlight != oldhighlight) || (val != oldval))
			update();
	}
	
	public void setColor(Atom ac[])
	{
		if (ac.length == 4)
		{
			color = Atom.toFloat(ac);
			jo.setAttr("color", color);
		}
	}
	
	public void setPosition(Atom ap[])
	{
		if (ap.length == 3)
		{
			position = Atom.toFloat(ap);
			jo.setAttr("position", position);
		}
	}
	
	public void setRotate(Atom ar[])
	{
		if (ar.length == 3)
		{
			rotate = Atom.toFloat(ar);
			jo.setAttr("rotate", rotate);
		}
	}
	
	public void setScale(Atom as[]) 
	{
		if (as.length == 3)
		{
			scale = Atom.toFloat(as);
			jo.setAttr("scale", scale);
		}
	}
	
}
