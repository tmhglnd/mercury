import com.cycling74.max.*;
import com.cycling74.jitter.*;
// Created on 12-Oct-2005

/**
 * @author bbn
 *
 * utility class to calculate the impulse response 
 * and related information for a biquadratic filter equation
 * y[n] = a0 * x[n] + a1 * x[n-1] + a2 * x[n-2] - b1 * y[n-1] - b2 * y[n-2]
 * 
 * 2005.11.30
 * support for cascaded biquads
 */
public class JitterBiquadAnalyzer extends MaxObject 
{
	public int size = 128;
	public String bufferName = null;
	public String matrixName = null;
	private JitterMatrix jm = new JitterMatrix(1, "float32", new int[]{size});
	
	JitterBiquadAnalyzer()
	{
		declareIO(1,3);
		declareAttribute("size", null, "setSize");
	}
	
	private void setSize(Atom a[])
	{
		size = a[0].toInt();
		jm.setDim(new int[] {size});
	}
	
	/**
	 * input directly from a filtergraph 
	 * coeffs will be input as a0, a1, a2, b1, b2
	 * and equation is 
	 * y[n] = c[0] * x[n] + c[1] * x[n-1] + c[2] * x[n-2] - c[3] * y[n-1] - c[4] * y[n-2]
	 */
	public void biquad(float c[])
	{
		int biggestSign=1;
		float ir[] = new float[size];
		ir[size-1]=c[0];
		ir[size-2]=c[1] - c[3] * ir[size-1];
		ir[size-3]=c[2] - c[3] * ir[size-2] - c[4] * ir[size-1];
		for (int i=size-4;i>=0;i--)
		{
			ir[i] = -c[3] * ir[i+1] - c[4] * ir[i+2];
		}
		jm.copyArrayToVector(0,null,ir,0,0);
		
		//find max for group delay
		float biggest = 0.f;
		int biggestIndex = 0;
		for (int i=0;i<ir.length;i++)
			if (Math.abs(ir[i]) > biggest)
			{
				biggest = Math.abs(ir[i]);
				biggestIndex = i;
				biggestSign = (ir[i] > 0.f)?1:-1;
			}
		
		outlet(2, biggestSign);
		outlet(1, size-1-biggestIndex);
		outlet(0, "jit_matrix", jm.getName());
	}
	
	
	public void cascade(float c[])
	{
		int biggestSign=1;
		float ir[] = new float[size];
		for (int i=0;i<size;i++)
			ir[i] = 0.0f;
		ir[size-1] = 1.0f;
		float tir[] = new float[size];
		
		int numberOfSos = c.length / 5;
		
		for (int s=0;s<numberOfSos;s++)
		{
			for (int i=0;i<size;i++)
				tir[i] = ir[i];
			ir[size-1] = tir[size-1]*c[s*5+0];
			ir[size-2] = tir[size-2]*c[s*5+0] + tir[size-1]*c[s*5+1] - ir[size-1]*c[s*5+3];
			for (int i=size-3;i>=0;i--)
				ir[i] = tir[i]*c[s*5+0] + tir[i+1]*c[s*5+1] + tir[i+2]*c[s*5+2] - ir[i+1]*c[s*5+3] - ir[i+2]*c[s*5+4];
		}
		jm.copyArrayToVector(0,null,tir,0,0);
		
		//find max for group delay
		float biggest = 0.f;
		int biggestIndex = 0;
		for (int i=0;i<tir.length;i++)
			if (Math.abs(tir[i]) > biggest)
			{
				biggest = Math.abs(tir[i]);
				biggestIndex = i;
				biggestSign = (tir[i] > 0.f)?1:-1;
			}
		
		outlet(2, biggestSign);
		outlet(1, size-1-biggestIndex);
		outlet(0, "jit_matrix", jm.getName());
	}
}
