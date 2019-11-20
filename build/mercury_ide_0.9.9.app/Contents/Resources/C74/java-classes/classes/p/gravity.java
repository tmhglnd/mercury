package p;
import com.cycling74.max.*;
import com.cycling74.jitter.*;

/**
 * @author bbn
 *
 * basic inter-particle Newtonian gravity
 * 
 */
public class gravity extends MaxObject {

	private final static double G = 6.672E-11; // (Nm^2/ Kg^2)
	private boolean scalemassbyG = true;
	
	ParticleMatrix pm = new ParticleMatrix();
	
	gravity()
	{
		declareAttribute("scalemassbyG");
	}
	
	public void jit_matrix(String mname)
	{
		try 
		{
			pm.fromInputName(mname);
	
			//brute-force pairwise iteration over the particle population
			//if n is a big number, n^2 is a really big number.
			for (int i=0;i<pm.dim[0];i++)
				for (int j=i+1;j<pm.dim[0];j++)
				{
					double distanceSquared = (	(pm.x[i]-pm.x[j])*(pm.x[i]-pm.x[j])+
												(pm.y[i]-pm.y[j])*(pm.y[i]-pm.y[j])+
												(pm.z[i]-pm.z[j])*(pm.z[i]-pm.z[j]) );
					double forceMagnitude = G / distanceSquared;
					if (scalemassbyG)
						forceMagnitude /= G;
					double accelMagnitudeI = forceMagnitude * pm.mass[j];
					double accelMagnitudeJ = forceMagnitude * pm.mass[i];
					//find the components of the normal pointing from i to j
					double distance = Math.sqrt(distanceSquared);
					double nx = (pm.x[j]-pm.x[i])/distance;
					double ny = (pm.y[j]-pm.y[i])/distance;
					double nz = (pm.z[j]-pm.z[i])/distance;
					pm.ax[i] += nx * accelMagnitudeI;
					pm.ax[j] += -nx * accelMagnitudeJ;
					pm.ay[i] += ny * accelMagnitudeI;
					pm.ay[j] += -ny * accelMagnitudeJ;
					pm.az[i] += nz * accelMagnitudeI;
					pm.az[j] += -nz * accelMagnitudeJ;				
				}

			pm.update();
			outlet(0, "jit_matrix", pm.getName());

		} catch (InvalidMatrixFormatException e) {
			error("gravity: invalid input matrix format.");
			return;
		}
	}
}
