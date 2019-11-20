import com.cycling74.max.*;
import com.cycling74.jitter.*;

/**
 * @author bbn
 *
 * a replacement for the poly~-based multiple-movie system
 */
public class javamoviebank extends MaxObject {
	
	JitterObject movie[]=null;
	JitterMatrix outputMatrix[]=null;

	private int size=0;
	private int outputmovie[] = null;
	private int background = 0;
	
	public javamoviebank(Atom a[]) {
		int numberOfOutlets = 1;
		if (a.length > 0) {
			if (!a[0].isInt()){
				error("javamoviebank: number of outlets argument must be an integer");
			} else {
				numberOfOutlets = a[0].getInt();
			}
		}
		outputmovie = new int[numberOfOutlets];
		declareIO(1,numberOfOutlets);	
		declareAttribute("size", null, "setSize");
		declareAttribute("outputmovie", null, "setOutputmovie");
		declareAttribute("background", null, "setBackground");
	}
	
	private void setSize(Atom a[]) 
	{
		if ((size = a[0].toInt()) > 0) {
			freePeers(movie);
			movie = new JitterObject[size];
			outputMatrix = new JitterMatrix[size];
			for (int i=0;i<size;i++)
			{
				movie[i] = new JitterObject("jit.qt.movie");
				movie[i].send("autostart",0);
				if (background==0)
					movie[i].send("stop");
				outputMatrix[i] = new JitterMatrix(4,"char",320,240);
			}
			
		} else {
			if (movie != null)
				size = movie.length;
			else size = 0;
		}
	}
	
	public void list(Atom a[]) 
	{
		if ((a.length < 2)||(movie == null)) return;
		int target = a[0].toInt();
		String message = a[1].toString();
		Atom args[] = null;
		if (a.length > 2) 
			args = Atom.removeSome(a,0,1);
		
		int startIndex = 0;
		int endIndex = movie.length-1;
		if (target != 0) {
			startIndex = target-1;
			endIndex = target-1;
		}
		for (int i=startIndex;i<=endIndex;i++)
		{
			Atom result[]=null;
			result = movie[i].send(message,args);
			int dumpoutletNumber = outputmovie.length;
			if (result != null)
				outlet(dumpoutletNumber, result); 
		}
	}
	
	public void setOutputmovie(Atom a[]) 
	{
		if (movie == null) return;
		if (a.length < outputmovie.length) return;
		int temp[] = new int[outputmovie.length];
		for (int i=0;i<outputmovie.length;i++)
			if (((temp[i] = a[i].toInt()) < 0) || (temp[i] > movie.length))
				return;
		
		for (int i=0;i<outputmovie.length;i++)
		{
			if ((background == 0)&&(outputmovie[i]>0))
				movie[outputmovie[i]-1].send("stop");
			outputmovie[i] = temp[i];
			if (outputmovie[i]>0)
				movie[outputmovie[i]-1].send("start");
		}
		
	}
	
	public void bang() 
	{
		if (movie==null) return;
		for (int i=0;i<outputmovie.length;i++)
			if (outputmovie[i] > 0)
			{
				movie[outputmovie[i]-1].matrixcalc(null, outputMatrix[outputmovie[i]-1]);
				outlet(i,"jit_matrix", outputMatrix[outputmovie[i]-1].getName());
			}
	}
	
	private void freePeers(JitterObject m[])
	{
		if (m != null)
			for (int i=0;i<m.length;i++)
				m[i].freePeer();
	}	
	
	protected void notifyDeleted()
	{
		freePeers(movie);
	}
}
