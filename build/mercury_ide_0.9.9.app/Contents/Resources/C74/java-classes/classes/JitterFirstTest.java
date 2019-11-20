import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class JitterFirstTest extends MaxObject
{

	public JitterMatrix mymatrix;
	public JitterMatrix mymatrix2;
	public JitterObject mybrcosa;
	public JitterObject mysobel;

    public JitterFirstTest(Atom[] args)
    {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
		
		// create internal matrices
		mymatrix = new JitterMatrix(); 
		mymatrix2 = new JitterMatrix(); 

		// create brcosa operator + set attributes
		mybrcosa = new JitterObject("jit.brcosa"); 
		mybrcosa.setAttr("contrast", 2.f);	

		// create sobel operator
		mysobel = new JitterObject("jit.sobel");
	} 
    
    public void jit_matrix(String inname)
    {
		JitterMatrix foo = new JitterMatrix(inname);
		// adapt to input
		mymatrix.setinfo(foo);
		mymatrix2.setinfo(inname);
		
		// apply brcosa operator
   		mybrcosa.matrixcalc(inname,mymatrix2);
		
		// apply sobel operator
		mysobel.matrixcalc(mymatrix2,mymatrix);
		
		// invert image in place
		mymatrix.op("~");	

		// output matrix name through patcher
		outlet(0,"jit_matrix",mymatrix.getAttr("name")); 
	}
    
	public void contrast(float f) 
	{	
		mybrcosa.setAttr("contrast",f);
	}

}


