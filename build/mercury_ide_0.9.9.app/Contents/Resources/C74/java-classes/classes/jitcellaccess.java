import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class jitcellaccess extends MaxObject
{
	JitterMatrix mat;

    public jitcellaccess(Atom[] args)
    {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
		mat = new JitterMatrix("scraggly",4,"char",100,100);
    }
    
    public void bang()
 	{
		generate();
		outlet(0,"jit_matrix",new Atom[] { Atom.newAtom(mat.getName()) } );
	}
    
	public void dim(int[] dimarray)
	{
		mat.setDim(dimarray);
	}

	public void generate()
	{
		int[] dim = mat.getDim();
		int[] val = new int[4];
		int width = dim[0];
		int height = dim[1];
		int i,j; 

		for (i=0;i<height;i++) {
			for (j=0;j<width;j++) {
				val[0] = 255;
				val[1] = j;
				val[2] = i;
				val[3] = (((i/8)%2)+((j/8)%2))>0?255:0; //checkerboard	
				mat.setcell2d(j,i,val);	
			}	
		}	
	}
}

