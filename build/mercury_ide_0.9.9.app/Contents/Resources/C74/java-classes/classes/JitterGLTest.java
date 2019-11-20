import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.util.Random;

public class JitterGLTest extends MaxObject
{
	JitterObject window;
	JitterObject render;
	JitterObject sketch;
	JitterObject handle;
	Random r = new Random();

    public JitterGLTest(Atom[] args)
    {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
   
		// create our window
		window = new JitterObject("jit.window",new Atom[]{Atom.newAtom("bobby")});
		window.setAttr("depthbuffer",1); 
		window.setAttr("fsaa",1); 

		// create our render object for our window
		render = new JitterObject("jit.gl.render",new Atom[]{Atom.newAtom("bobby")});
		render.setAttr("camera",new float[] {0.f,0.f,4.f});

		// create our handle
		handle = new JitterObject("jit.gl.handle",new Atom[]{Atom.newAtom("bobby")}); 

		// create out sketch object
		sketch = new JitterObject("jit.gl.sketch",new Atom[]{Atom.newAtom("bobby")});
		sketch.setAttr("lighting_enable",1);
		sketch.setAttr("smooth_shading",0);
		sketch.setAttr("displaylist",1);
	
		randomize();
	}
    
    public void bang()
    {
		sketch.setAttr("position",handle.getAttr("position"));
		sketch.setAttr("rotate",handle.getAttr("rotate"));
		render.send("erase");
		render.send("drawclients");
		render.send("swap");
    }
    
    public void randomize()
    {
		// randomize jit.gl.render's erase color
		render.setAttr("erase_color",new float[]{(float)r.nextGaussian(),(float)r.nextGaussian(),(float)r.nextGaussian(),1.f});
		sketch.send("reset");
		sketch.send("shapeslice",new int[]{20,20});
		for (int i=0;i<10;i++)
		{
			sketch.send("glcolor",new float[]{(float)r.nextGaussian(),(float)r.nextGaussian(),(float)r.nextGaussian()});			
			sketch.send("moveto",new float[]{(float)r.nextGaussian(),(float)r.nextGaussian(),(float)r.nextGaussian()});
			sketch.send("torus",new float[]{(float)r.nextGaussian()/10.f,(float)r.nextGaussian()/10.f});
		}
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

