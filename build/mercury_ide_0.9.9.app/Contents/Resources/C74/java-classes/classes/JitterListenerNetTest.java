import com.cycling74.max.*;
import com.cycling74.jitter.*;

public class JitterListenerNetTest extends MaxObject implements JitterNotifiable
{
	JitterObject receiver;
	JitterListener listener;

	public JitterListenerNetTest(Atom[] args)
	{
		declareIO(1,3);
		
		// create our network receive object
		receiver = new JitterObject("jit.net.recv");
		
		// build our listener
		listener = new JitterListener(receiver.getRegisteredName(),this);
	}

	public void port(int pnum)
	{
		receiver.setAttr("port",pnum); //should report "attr_modified"		
	}

	public void notify(JitterEvent e)
	{
		String eventname = e.getEventName();
		
		if (eventname.equals("matrix_received"))
		{
			Atom[] args = e.getArgs();
			outputMatrix(args[0].toInt());
		}
		else if (eventname.equals("message_received"))
		{
			Atom[] args = e.getArgs();
			outputMessage(args[0].toInt());
		}
		else if (eventname.equals("connected_notification")) 
		{
			outputConnected();
		}
	}

	private void outputMatrix(int howmany)
	{
		for (int i=0;i<howmany;i++)
		{
			Atom a[] = receiver.send("getmatrix", i);
			outlet(0, "jit_matrix", a[0].toString());
		}
	}
	
	private void outputMessage(int howmany)
	{
		for (int i=0;i<howmany;i++)
		{
			Atom a[] = receiver.send("getmessage", i);
			outlet(1, a);
		}
	}
	
	private void outputConnected()
	{
		outlet(2, receiver.getAttrInt("connected"));
	}
	
 	public void notifyDeleted()
	{
		// free max peers. otherwise these will persist for a while
		// until the garbage collector feels like cleaning up 
		receiver.freePeer();
	}
}