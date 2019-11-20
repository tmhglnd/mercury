// Created on 31-Aug-2005
import java.util.*;


/**
 * @author bbn
 *
 * The gui utilities exist within this Environment.  
 * A private constructor ensures that only one copy of the environment will ever be created.
 */
public class JitterGuiEnvironment {

	HashMap trackers = new HashMap();
	private static JitterGuiEnvironment theonlyone = null;
	
	//this class does not have a public constructor.
	private JitterGuiEnvironment() {}
	
	public static JitterGuiEnvironment getEnvironment()
	{
		if (theonlyone == null)
			theonlyone = new JitterGuiEnvironment();
		return theonlyone;
	}
	
	public void addTracker(String destination)
	{
		if (!trackers.containsKey(destination))
		{
			trackers.put(destination, new JitterGuiTracker(destination));
		}
	}

	public void init(String destination) 
	{
		((JitterGuiTracker)trackers.get(destination)).makeListener();
	}
	
	public void addClient(String destination, JitterGuiElement newclient)
	{
		((JitterGuiTracker)trackers.get(destination)).addClient(newclient);
	}
	
	public void deleteBogusClients(String destination)
	{
		((JitterGuiTracker)trackers.get(destination)).deleteBogusClients();
	}
}
