// Created on 30-Apr-2005
package p;

import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.util.*;

/**
 * @author bbn
 *
 * renders a particle matrix for drawing with a yellow sun as the 0th element
 */
public class yellowsun extends MaxObject {

	JitterMatrix jm = null;
	ParticleMatrix pm = new ParticleMatrix();
	int dim[] = null;
	boolean centered = false;
	double centerfactor = 0.1;
	int renderpoints = 6;
	double cometsize = 0.025;
	double starsize = 0.25;
	Random r = new Random();
	
	yellowsun() {
		declareIO(1,2);
		
		//toggle to keep the sun in the middle of the window
		declareAttribute("centered");  
		
		//how "dampened" should the sun's motion be? 
		declareAttribute("centerfactor");
		
		//how many points should be rendered for each body?
		declareAttribute("renderpoints",null,"setRenderpoints");
		
		declareAttribute("cometsize");
		declareAttribute("starsize");
	}
		
	public void jit_matrix(String mname) 
	{
		try {
			pm.fromInputName(mname);
			if ((jm == null) || (dim[0] != pm.numberOfParticles))
				generateNewOutputMatrix(pm);
			
			if (centered)
			{
				//calculate the x,y,z subtraction for position
				double xsub = pm.x[0] * centerfactor;
				double ysub = pm.y[0] * centerfactor;
				double zsub = pm.z[0] * centerfactor;
				for (int i=0;i<pm.numberOfParticles;i++)
				{
					pm.x[i] -= xsub;
					pm.y[i] -= ysub;
					pm.z[i] -= zsub;				
				}
				//calculate the vx,vy,vz subtraction for velocity
				xsub = pm.vx[0] * centerfactor;
				ysub = pm.vy[0] * centerfactor;
				zsub = pm.vz[0] * centerfactor;
				for (int i=0;i<pm.numberOfParticles;i++)
				{
					pm.vx[i] -= xsub;
					pm.vy[i] -= ysub;
					pm.vz[i] -= zsub;				
				}
				
				pm.update();
			}
	
			//random points around each body's central location
			for (int i=0;i<renderpoints;i++)
			{
				int offset[] = new int[] {0,i};
				double temp[] = new double[pm.x.length];
				temp[0] = pm.x[0] + (r.nextGaussian()) * starsize;
				for (int j=1;j<temp.length;j++)
					temp[j] = pm.x[j] + (r.nextGaussian()) * cometsize;
				jm.copyArrayToVectorPlanar(0,0,offset,temp,dim[0],0);
				temp[0] = pm.y[0] + (r.nextGaussian()) * starsize;
				for (int j=1;j<temp.length;j++)
					temp[j] = pm.y[j] + (r.nextGaussian()) * cometsize;
				jm.copyArrayToVectorPlanar(1,0,offset,temp,dim[0],0);
				temp[0] = pm.z[0] + (r.nextGaussian()) * starsize;
				for (int j=1;j<temp.length;j++)
					temp[j] = pm.z[j] + (r.nextGaussian()) * cometsize;
				jm.copyArrayToVectorPlanar(2,0,offset,temp,dim[0],0);
			}
			outlet(1, "jit_matrix", pm.getName());
			outlet(0, "jit_matrix", jm.getName());
		} catch (Exception e) {
			
		}
	}
	
	private void generateNewOutputMatrix(ParticleMatrix pm)
	{
		if (jm != null)
			jm.freePeer();
		jm = new JitterMatrix(12, "float64", pm.numberOfParticles, renderpoints);
		dim = jm.getDim();
		
		//find the largest mass
		double largestmass = 0.0;
		for (int i=1;i<pm.numberOfParticles;i++)
			if (pm.mass[i] > largestmass)
				largestmass = pm.mass[i];
		
		double r[] = new double[pm.numberOfParticles];
		double g[] = new double[pm.numberOfParticles];
		double b[] = new double[pm.numberOfParticles];
		double a[] = new double[pm.numberOfParticles];
		r[0] = 1.0; g[0] = 1.0; b[0] = 0.0; a[0] = 0.8;
		for (int i=1;i<pm.numberOfParticles;i++) {
			double scalefactor = Math.pow((pm.mass[i] / largestmass), 0.5);
			r[i] = 1.0 * scalefactor; 
			g[i] = 1.0 * scalefactor; 
			b[i] = 1.0 * scalefactor; 
			a[i] = 0.8;
		}
		for (int i=0;i<renderpoints;i++)
		{
			int offset[] = new int[]{0,i};
			jm.copyArrayToVectorPlanar(8, 0, offset,r,dim[0],0);
			jm.copyArrayToVectorPlanar(9, 0, offset,g,dim[0],0);
			jm.copyArrayToVectorPlanar(10,0,offset,b,dim[0],0);
			jm.copyArrayToVectorPlanar(11,0,offset,a,dim[0],0);
		}
	}
	
	private void setRenderpoints(int i)
	{
		if (i<1)
			i = 1;
		renderpoints = i;
		generateNewOutputMatrix(pm);
	}
}
