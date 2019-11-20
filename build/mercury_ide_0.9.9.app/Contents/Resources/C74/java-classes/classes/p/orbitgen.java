// Created on 30-Apr-2005
package p;

import com.cycling74.max.*;
//import com.cycling74.jitter.*;

/**
 * @author bbn
 * 
 */
public class orbitgen extends MaxObject {
	
	private final static double G = 6.672E-11; // (Nm^2/ Kg^2)

	public void bang()
	{
		ParticleMatrix pm = new ParticleMatrix(2);
		for (int i=0;i<2;i++)
		{
			pm.id[i] = 0;
			pm.life[i] = 99;
			pm.x[i] = ((i==0)?1:-1);
			pm.y[i] = 0;
			pm.z[i] = 0;
			pm.vx[i] = 0;
			pm.vy[i] = ((i==0)?-1:1);
			pm.vz[i] = 0;
			pm.ax[i] = 0;
			pm.ay[i] = 0;
			pm.az[i] = 0;
			pm.mass[i] = 4.0;
			pm.charge[i] = 0;
		}
		pm.update();
		outlet(0, "jit_matrix", pm.getName());
	}
}
