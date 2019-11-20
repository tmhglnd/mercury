import com.cycling74.max.*;
import com.cycling74.jitter.*;

// created by bbn on Feb 10, 2005
/**
 * creates a Max object with peer jitter matrix operator that operates as the jitter object 
 * would, but also provides a feedback mechanism.
 * 
 * @author bbn
 */
public class jitfeedback extends MaxObject {
	
	JitterObject thing;
	JitterMatrix fbmatrix = new JitterMatrix();
	float fbfactor = 0.5f;
	
	public jitfeedback(Atom a[]) 
	{
		declareIO(1,2);
		declareAttribute("fbfactor");
		thing = new JitterObject(a[0].toString(), Atom.removeFirst(a));
		//thing = new JitterObject("jit.sobel");
		fbmatrix.setall(0);
		//fbmatrix.setAdapt(1);
	}
	
	//TODO what about objects with more than one input?
	public void jit_matrix(String inname) 
	{
		JitterMatrix input = new JitterMatrix(inname);
		addFeedBack(input, fbmatrix, fbfactor);
		thing.matrixcalc(input, fbmatrix);
		outlet(0, "jit_matrix", fbmatrix.getAttr("name"));
	}
	
	//TODO improve feedback math -- fixed point, like jit.wake?
	public void addFeedBack(JitterMatrix input, JitterMatrix fb, float factor)
	{
		fb.setinfo(input);
		fb.op("*", factor);
		input.op("+", fb);
	}
	
	public void anything(Atom a[]) 
	{
		Atom results[] = null;
		if (a[0].isInt())
			results = thing.send(a[0].getInt());
		else if (a[0].isFloat())
			results = thing.send(a[0].getFloat());
		else if (a.length == 1)
			results = thing.send(a[0].toString());
		else 
			results = thing.send(a[0].toString(), Atom.removeFirst(a));
		
		if ((results!=null)&&(results.length > 0))
			outlet(1, results);
	}
}
