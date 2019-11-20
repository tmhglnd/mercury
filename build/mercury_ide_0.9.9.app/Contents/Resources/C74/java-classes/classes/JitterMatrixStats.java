import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class JitterMatrixStats extends MaxObject {
	
	private JitterMatrix jm = new JitterMatrix();
	
	JitterMatrixStats() 
	{
		declareIO(1,2);
		createInfoOutlet(false);
	}
	
	public void jit_matrix(String mname)
	{
		jm.frommatrix(mname);
		int dim[] = jm.getDim();
		int planecount = jm.getPlanecount();
		int numcells = planecount;
		for (int i=0;i<dim.length;i++)
			numcells *= dim[i];
		
		//calculate the mean in 2D slices
		double mean = calcMean(jm, dim, dim.length, planecount, null, numcells);
		
		//calculate the variance in 2D slices
		double variance = calcVariance(jm, dim, dim.length, planecount, null, mean, numcells);
		
		outlet(1, variance);
		outlet(0, mean);
	
	}
	
	private double calcMean(JitterMatrix jm, int dim[], int dimcount, int planecount, int offset[], int numcells)
	{
		return calcTotal(jm, dim, dimcount, planecount, offset) / (double)numcells;
	}
		
	private double calcTotal(JitterMatrix jm, int dim[], int dimcount, int planecount, int offset[])
	
	{
		double accum = 0.0;
		if (offset == null)
		{
			offset = new int[dim.length];
			for (int i=0;i<dim.length;i++)
				offset[i] = 0;
		}
		switch (dimcount) {
			case 0:
			case 1:
				{
				double vals[] = new double[dim[0]];
				jm.copyVectorToArray(0, offset, vals, 0, 0);
				for (int i=0;i<dim[0];i++)
				{
					accum += vals[i];
				}
				break;
				}
			case 2:
				for (int i=0;i<dim[0];i++)
				{
					offset[0] = i;
					double vals[] = new double[dim[1]];
					jm.copyVectorToArray(1, offset, vals, 0, dim[1]);
					for (int j=0;j<dim[1];j++)
					{
						accum += vals[j];
					}
				}		
				break;
			default:
				for (int i=0;i<dim[dimcount];i++)
				{
					offset[dimcount] = i;
					accum += calcTotal(jm, dim, dimcount-1, planecount, offset);
				}
				break;
		}		
		return accum;
	}
	
	private double calcVariance(JitterMatrix jm, int dim[], int dimcount, int planecount, int offset[], double mean, int numcells)
	{
		
		return calcDiffSquare(jm, dim, dimcount, planecount, offset, mean) / (double)numcells;
	}

	private double calcDiffSquare(JitterMatrix jm, int dim[], int dimcount, int planecount, int offset[], double mean)
	{
		double accum = 0.0;
		if (offset == null)
		{
			offset = new int[dim.length];
			for (int i=0;i<dim.length;i++)
				offset[i] = 0;
		}
		switch (dimcount) {
			case 0:
			case 1:
				{
				double vals[] = new double[dim[0]];
				jm.copyVectorToArray(0, offset, vals, 0, 0);
				for (int i=0;i<dim[0];i++)
				{
					double diff = vals[i]-mean;
					accum += diff*diff;
				}
				break;
				}
			case 2:
				for (int i=0;i<dim[0];i++)
				{
					offset[0] = i;
					double vals[] = new double[dim[1]];
					jm.copyVectorToArray(1, offset, vals, 0, dim[1]);
					for (int j=0;j<dim[1];j++)
					{
						double diff = vals[j]-mean;
						accum += diff*diff;
					}
				}		
				break;
			default:
				for (int i=0;i<dim[dimcount];i++)
				{
					offset[dimcount] = i;
					accum += calcDiffSquare(jm, dim, dimcount-1, planecount, offset, mean);
				}
				break;
		}		
		return accum;
	}

}
