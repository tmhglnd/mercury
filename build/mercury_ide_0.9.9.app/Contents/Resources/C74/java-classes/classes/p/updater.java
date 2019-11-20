package p;
import com.cycling74.max.*;
import com.cycling74.jitter.*;

/**
 * @author bbn
 *
 * after all the accelerating forces have been accumulated, 
 * this object adjusts the velocities and positions of the particles.
 */
public class updater extends MaxObject 
{
	double timeElapsed = 0.0;
	ParticleMatrix pm = new ParticleMatrix();
	
	updater() 
	{
		declareIO(2, 1);
	}

	public void inlet(int i) {inlet((float)i);}
	public void inlet(float f)
	{
		timeElapsed = (double)f / 1000.0;  //input is in milliseconds
	}
	
	public void jit_matrix(String mname) 
	{
		try
		{
			pm.fromInputName(mname);
			for (int i=0;i<pm.numberOfParticles;i++)
			{
				pm.vx[i] += pm.ax[i] * timeElapsed;
				pm.vy[i] += pm.ay[i] * timeElapsed;
				pm.vz[i] += pm.az[i] * timeElapsed;
				
				pm.x[i] += pm.vx[i] * timeElapsed;
				pm.y[i] += pm.vy[i] * timeElapsed;
				pm.z[i] += pm.vz[i] * timeElapsed;
				
				pm.ax[i] = pm.ay[i] = pm.az[i] = 0.0;
			}
			pm.update();
			outlet(0, "jit_matrix", pm.getName());
		}
		catch (InvalidMatrixFormatException e)
		{
			error("updater: invalid matrix format");
		}
	}
}
