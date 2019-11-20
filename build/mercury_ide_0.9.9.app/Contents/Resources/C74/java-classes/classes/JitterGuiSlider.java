// Created on 3-Sep-2005
import com.cycling74.max.*;

/**
 * @author bbn
 *
 * Max object container for a single slider
 */
public class JitterGuiSlider extends MaxObject {

	private JitterGuiSliderElement s=null;
		
	public JitterGuiSlider(Atom args[])
	{		
		if (args.length == 0)
			bail("gui.slider: need a context argument");
		String context = args[0].toString();
		s = new JitterGuiSliderElement(this, new Callback(this, "out"));
		s.init(context);
		declareAttribute("color", null, "setColor");
		declareAttribute("rotate", null, "setRotate");
		declareAttribute("position", null, "setPosition");
		declareAttribute("scale", null, "setScale");
	}
	
	public void out()
	{
		outlet(0, s.val);
	}
	
	public void notifyDeleted()
	{
		s.free();
	}
	
	public void setColor(Atom a[]) {s.setColor(a);}
	public void setRotate(Atom a[]) {s.setRotate(a);}
	public void setPosition(Atom a[]) {s.setPosition(a);}
	public void setScale(Atom a[]) {s.setScale(a);}
}