// Created on 28-Apr-2005
package p;
import com.cycling74.jitter.*;

/**
 * @author bbn
 *
 * various conveniences for dealing with particle matrices
 */
public class ParticleMatrix extends JitterMatrix {
	
	private static final int PARTICLE_PLANES = 13;
	
	public int[] dim=null;
	public int planecount;
	public double[] id = null;
	public double[] life = null;
	public double[] x = null;
	public double[] y = null;
	public double[] z = null;
	public double[] vx= null;
	public double[] vy= null;
	public double[] vz= null;
	public double[] ax= null;
	public double[] ay= null;
	public double[] az= null;
	public double[] mass = null;
	public double[] charge = null;
	public int numberOfParticles = 0;
	
	/**
	 * creates a new ParticleMatrix with a particular number of elements
	 * @param numParticles the number of particles
	 */
	ParticleMatrix(int numParticles)
	{
		super(PARTICLE_PLANES, "float64", numParticles);
		getDataFromMatrix();
	}
	
	/**
	 * creates a new ParticleMatrix with one element.  Usually this
	 * is what you would use if you're going to adjust the ParticleMatrix
	 * to an incoming input matrix using fromMatrixName()
	 */
	ParticleMatrix()
	{
		this(1);
	}
	
	ParticleMatrix(String mname) throws InvalidMatrixFormatException 
	{
		super(mname); 
		dim = getDim();
		numberOfParticles = dim[0];
		planecount = getPlanecount();
		testConformity();
		getDataFromMatrix();
	}
	
	private void testConformity() throws InvalidMatrixFormatException
	{
		if (!getType().equals("float64"))
			throw new InvalidMatrixFormatException("particle matrix type must be float64");
		
		//(necessary planes: ID,life,x,y,z,vx,vy,vz,ax,ay,az,mass,charge)
		if (getPlanecount() < 13)
			throw new InvalidMatrixFormatException("particle matrix must have at least 13 planes");		
	}
	
	public void fromInputName(String mname) throws InvalidMatrixFormatException
	{
		setinfo(mname);
		testConformity();
		frommatrix(mname);
		getDataFromMatrix();
	}
	
	private void getDataFromMatrix() {		
		planecount = getPlanecount();
		dim = getDim();
		numberOfParticles = dim[0];
		id = new double[numberOfParticles];
		copyVectorToArrayPlanar(0,0,null,x,dim[0],0);
		life = new double[numberOfParticles];
		copyVectorToArrayPlanar(1,0,null,x,dim[0],0);
		x = new double[numberOfParticles];
		copyVectorToArrayPlanar(2,0,null,x,dim[0],0);
		y = new double[numberOfParticles];
		copyVectorToArrayPlanar(3,0,null,y,dim[0],0);
		z = new double[numberOfParticles];
		copyVectorToArrayPlanar(4,0,null,z,dim[0],0);
		vx = new double[numberOfParticles];
		copyVectorToArrayPlanar(5,0,null,vx,dim[0],0);
		vy = new double[numberOfParticles];
		copyVectorToArrayPlanar(6,0,null,vy,dim[0],0);
		vz = new double[numberOfParticles];
		copyVectorToArrayPlanar(7,0,null,vz,dim[0],0);
		ax = new double[numberOfParticles];
		copyVectorToArrayPlanar(8,0,null,ax,dim[0],0);
		ay = new double[numberOfParticles];
		copyVectorToArrayPlanar(9,0,null,ay,dim[0],0);
		az = new double[numberOfParticles];
		copyVectorToArrayPlanar(10,0,null,az,dim[0],0);
		mass = new double[numberOfParticles];
		copyVectorToArrayPlanar(11,0,null,mass,dim[0],0);
		charge = new double[numberOfParticles];
		copyVectorToArrayPlanar(12,0,null,charge,dim[0],0);
	}
	
	public void update() 
	{
		copyArrayToVectorPlanar(0,0,null,id,dim[0],0);
		copyArrayToVectorPlanar(1,0,null,life,dim[0],0);
		copyArrayToVectorPlanar(2,0,null,x,dim[0],0);
		copyArrayToVectorPlanar(3,0,null,y,dim[0],0);
		copyArrayToVectorPlanar(4,0,null,z,dim[0],0);
		copyArrayToVectorPlanar(5,0,null,vx,dim[0],0);
		copyArrayToVectorPlanar(6,0,null,vy,dim[0],0);
		copyArrayToVectorPlanar(7,0,null,vz,dim[0],0);
		copyArrayToVectorPlanar(8,0,null,ax,dim[0],0);
		copyArrayToVectorPlanar(9,0,null,ay,dim[0],0);
		copyArrayToVectorPlanar(10,0,null,az,dim[0],0);
		copyArrayToVectorPlanar(11,0,null,mass,dim[0],0);
		copyArrayToVectorPlanar(12,0,null,charge,dim[0],0);
	}
}

