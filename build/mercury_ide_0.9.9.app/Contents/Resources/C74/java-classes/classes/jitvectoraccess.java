import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class jitvectoraccess extends MaxObject
{
	JitterMatrix mat;
	int[] vec = null;

    public jitvectoraccess(Atom[] args)
    {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
 		mat = new JitterMatrix("scroggly",4,"char",100,100);
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
		int[] offset = new int[2];
		int width = dim[0];
		int height = dim[1];
		int i,j,k; 

		offset[0] = 0;

		// only alloc vec if size is different
		if ((vec==null)||(vec.length!=(dim[0]*4)))
			vec = new int[dim[0]*4]; //assuming planecount of 4				

		for (i=0;i<height;i++) {

			for (j=0,k=0;j<width;j++,k+=4) {
				vec[k] = 255;
				vec[k+1] = j;
				vec[k+2] = i;
				vec[k+3] = (((i/8)%2)+((j/8)%2))>0?255:0; //checkerboard	
			}
			offset[1] = i;	
			mat.copyArrayToVector(0,offset,vec,vec.length,0);	
		}	
	}
    
}






