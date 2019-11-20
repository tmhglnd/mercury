import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.awt.*;
import java.awt.geom.*;

// created by bbn on Mar 8, 2005
/**
 * takes four control (x,y) points and renders a cubic curve
 * using a recursive subdivision of the curve
 *
 * @author bbn
 */
public class jitcubiccurve extends MaxObject {
	
	private static final int[] zeroOffset = new int[] {0,0};
	private Color c = Color.cyan;
	private int[] argb = new int[] {c.getAlpha(), c.getRed(), c.getGreen(), c.getBlue()};
	JitterMatrix out = new JitterMatrix(4, "char", new int[] {200, 200});
	private int[] background = new int[] {0,0,0,0};
	
	public jitcubiccurve (Atom[] argz)
	{
		declareAttribute("dim", "getDim", "setDim");
		declareAttribute("color", "getColor", "setColor");
		declareAttribute("background");
	}

	

	public void jit_matrix(String matrixname) 
	{
		JitterMatrix j = new JitterMatrix(matrixname);
		float[] curveData = new float[8];
		j.copyVectorToArray(0, zeroOffset, curveData, 8, 0);
		CubicCurve2D.Float cc = new CubicCurve2D.Float(	curveData[0], curveData[1],
														curveData[2], curveData[3],
														curveData[4], curveData[5],
														curveData[6], curveData[7]);
		
		render(cc, out);
		outlet(0,"jit_matrix",out.getName());
	}

	private void render(CubicCurve2D.Float cc, JitterMatrix out) 
	{
		//strategy - continue to subdivide the cubic curve until the division fits entirely within one pixel.
		//not ideal since every poxel passed through will get hit
		Rectangle area = cc.getBounds();
		if ((area.width > 1)||(area.height > 1))
		{
			CubicCurve2D.Float left = new CubicCurve2D.Float();
			CubicCurve2D.Float right = new CubicCurve2D.Float();
			cc.subdivide(left, right);
			render(left, out);
			render(right, out);
		} else {
			out.setcell(new int[] {(int)area.x, (int)area.y}, argb);
		}
	}
	
	public void erase() 
	{
		out.setall(background);
	}
	
	private void setDim(Atom[] args)
	{
		if (args.length < 2)
			return;
		int dim[] = new int[2];
		dim[0] = (0 > args[0].toInt() ? 0 : args[0].toInt());
		dim[1] = (0 > args[1].toInt() ? 0 : args[1].toInt());
		out = new JitterMatrix(4, "char", dim);
	}	
	
	private int[] getDim() 
	{
		return  out.getDim();
	}
	
	private void setColor(int[] argb)
	{
		this.argb = argb;
		c = new Color(argb[1], argb[2], argb[3], argb[0]);
	}

	private int[] getColor() 
	{																													
		return new int[] {c.getRed(), c.getGreen(), c.getBlue(), c.getAlpha()};			
	}
	
}
