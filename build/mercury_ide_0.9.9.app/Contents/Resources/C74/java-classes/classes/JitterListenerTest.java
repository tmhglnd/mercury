import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class JitterListenerTest extends MaxObject implements JitterNotifiable
{
	JitterObject window;
	JitterObject render;
	JitterObject sketch;
	JitterObject handle;
	JitterListener listener;

    public JitterListenerTest(Atom[] args)
    {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
   
		// create our window
		window = new JitterObject("jit.window",new Atom[]{Atom.newAtom("bobby")});
		window.setAttr("depthbuffer",1); 
		window.setAttr("fsaa",1); 
		window.setAttr("idlemouse",1);
 
		// create our render object for our window
		render = new JitterObject("jit.gl.render",new Atom[]{Atom.newAtom("bobby")});
		render.setAttr("camera",new float[] {0.f,0.f,4.f});

		// create our handle
		handle = new JitterObject("jit.gl.handle",new Atom[]{Atom.newAtom("bobby")}); 

		// create out sketch object
		sketch = new JitterObject("jit.gl.sketch",new Atom[]{Atom.newAtom("bobby")});
	
		// build our drawing list
		sketch.send("reset");
		sketch.send("torus");
		sketch.setAttr("lighting_enable",1);
		sketch.setAttr("smooth_shading",0);
		
		// build our listener
		listener = new JitterListener("bobby",this);
	}
    
    public void bang()
    {
		sketch.setAttr("position",handle.getAttr("position"));
		sketch.setAttr("rotate",handle.getAttr("rotate"));
		render.send("erase");
		render.send("drawclients");
		render.send("swap");
    }
    
	public void notify(JitterEvent e)
	{
		String subjectname = e.getSubjectName();
		String eventname = e.getEventName();
		Atom args[] = e.getArgs();
	
		outlet(0,subjectname);
		outlet(0,eventname,args);
	}

 	public void notifyDeleted()
	{
		// free max peers. otherwise these will persist for a while
		// until the garbage collector feels like cleaning up 
		handle.freePeer();
		sketch.freePeer();
		render.freePeer();
		window.freePeer();
	}
    
}








