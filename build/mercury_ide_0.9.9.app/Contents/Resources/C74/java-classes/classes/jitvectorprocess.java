import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class jitvectorprocess extends MaxObject
{
	JitterMatrix mat;
	int[] vec = null;
	
    public jitvectorprocess(Atom[] args)
    {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
 		mat = new JitterMatrix();
   	}

    public void bang()
 	{
		outlet(0,"jit_matrix", mat.getAttr("name"));
	}
    
	public void jit_matrix(String inname)
	{
		int[] dim;
		int[] offset = new int[2];
		int width;
		int height;
		int planecount;
		int i,j,k,n; 
		JitterMatrix inmat = new JitterMatrix(inname);

		mat.setinfo(inname);
		dim = mat.getDim();
		planecount = mat.getPlanecount();	
		// only alloc vec if size is different
		if ((vec==null)||(vec.length!=(dim[0]*planecount)))
			vec = new int[dim[0]*planecount];
					
		width = dim[0];
		height = dim[1];
		offset[0] = 0;

		for (i=0;i<height;i++) {
			offset[1] = i;	
			inmat.copyVectorToArray(0,offset,vec,vec.length,0);	
			if (planecount==4) {
				for (j=0,k=0;j<width;j++) {	
					vec[k] = 255-vec[k++];
					vec[k] = 255-vec[k++];
					vec[k] = 255-vec[k++];
					vec[k] = 255-vec[k++];
				}
			} else {
				for (j=0,k=0;j<width;j++) {	
					for (n=0;n<planecount;n++,k++) {
						vec[k] = 255-vec[k];
					}
				}
			}
			mat.copyArrayToVector(0,offset,vec,vec.length,0);	
		}	
		outlet(0,"jit_matrix", mat.getAttr("name"));
	}
}



