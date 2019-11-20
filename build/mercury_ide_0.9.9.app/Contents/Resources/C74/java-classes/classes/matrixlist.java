import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.util.*;

// created by bbn on Feb 28, 2005
/**
 * matrixlist is a wrapper around ArrayList for JitterMatrix objects
 * 
 *
 * @author bbn
 */
public class matrixlist extends MaxObject {
	
	private static class matrixlist_single {
		public String name;
		public ArrayList matrices;
		public int instanceCount;
	}
	private static ArrayList matrixlists = new ArrayList();
	
	//local references
	private ArrayList matrices = null;
	private String name = null;
	
	public matrixlist() 
	{ //no argument- matrixlist will not be public
		name = null;
		matrices = new ArrayList();
		declareReadOnlyAttribute("size", "getSize");
	}
	
	public matrixlist(String s) { //argument
		name = s;
		matrices = findName(name);
		if (matrices == null)
			matrices = addName(name);
		else {
			int i = findIndex(name);
			((matrixlist_single)(matrixlists.get(i))).instanceCount++;
		}
		declareReadOnlyAttribute("size", "getSize");
	}
	
	private static int findIndex(String name)
	{
		int i=-1;
		while (++i<matrixlists.size())
			if (((matrixlist_single)(matrixlists.get(i))).name.equals(name))
				return i;
		return -1;
	}
	
	public static ArrayList findName(String name) 
	{
		ArrayList al = null;
		int i=findIndex(name);
		if (i!=-1)
			al = ((matrixlist_single)matrixlists.get(i)).matrices;
		return al;
	}
	
	public static ArrayList addName(String name)
	{
		matrixlist_single ms = new matrixlist_single();
		ms.name = name;
		ms.matrices = new ArrayList();
		ms.instanceCount = 1;
		matrixlists.add(ms);
		return ms.matrices;
	}
	
	// decrement instance counter
	// remove from matrixlists if no instances exist
	public static void removeName(String name)
	{
		int i = findIndex(name);
		if (i!=-1)
		{
			matrixlist_single ms = (matrixlist_single)(matrixlists.get(i));
			ms.instanceCount--;
			if (ms.instanceCount == 0)
				matrixlists.remove(i);
		}
	}
	
	public void notifyDeleted()
	{
		removeName(name);
	}
	
	
	
	public Atom[] getSize() {return new Atom[] {Atom.newAtom(matrices.size())};}
	
	
	public void add(String s)
	{
		doInsert(s, matrices.size());
	}
	
	public void insert(Atom[] a)
	{
		if ((a.length>2)||(!a[0].isString())||(!a[1].isInt())) {
			error("matrixlist: bad insert message");
			error("usage --> insert [matrixname] [index]");
			return;
		}
		doInsert(a[0].getString(), a[1].getInt());
	}

	private void doInsert(String matrixname, int index)
	{
		JitterMatrix j = new JitterMatrix();
		j.setinfo(matrixname);	
		j.frommatrix(matrixname);
		matrices.add(j);
	}
	
	public void set(Atom[] a) 
	{
		if ((a.length>2)||(!a[0].isString())||(!a[1].isInt())) {
			error("matrixlist: bad set message");
			error("usage --> set [matrixname] [index]");
			return;
		}
		String matrixname = a[0].getString();
		JitterMatrix j = new JitterMatrix();
		j.setinfo(matrixname);	
		j.frommatrix(matrixname);
		matrices.set(a[1].getInt(), j);
	}
	
	
	public void remove(int index)
	{
		if ((index > 0)&&(index < matrices.size()))
			matrices.remove(index);
	}
	
	public void clear() 
	{
		matrices.clear();
	}

	
	public void output(int i) {
		if ((i<matrices.size())&&(i>=0)) {
			JitterMatrix m = (JitterMatrix)matrices.get(i);
			outlet(0, "jit_matrix", m.getName());
		}
	}
}

/*
it would be cool if a matrixlist could have a name
and other objects could access the list via that name.
*/