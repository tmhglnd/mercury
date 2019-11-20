/*
	Copyright (c) 2012 Cycling '74

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies 
	or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
	OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

package net.tcp;
import com.cycling74.max.*;
import com.cycling74.net.*;

public class send extends MaxObject {

	private TcpSender ts;
	
    send(Atom args[]) {
    	declareIO(1, 3);
    	setInletAssist(0, "(anything) message to send to group");
    	setOutletAssist(0, "(anything) successfully sent data");
    	setOutletAssist(1, "(anything) data unsuccessfully sent");
    	setOutletAssist(2, "(int) number of active packets");
    	declareAttribute("address", "getAddress", "setAddress");
    	declareAttribute("port", "getPort", "setPort");
	    ts = new TcpSender();
	    ts.setDebugString("net.tcp.send");
	    ts.setSuccessCallback(this, "success");
	    ts.setFailureCallback(this, "failure");
    }
    
    private void setAddress(String s) {
    		ts.setAddress(s);
    }
    private Atom[] getAddress() {
    		return new Atom[] {Atom.newAtom(ts.getAddress())};
    }
    
    private void setPort(int i) {
    		ts.setPort(i);
    }
    private Atom[] getPort() {
    		return new Atom[] {Atom.newAtom(ts.getPort())};
    }
    
 	public void inlet(int i) {
		ts.send(i);
		outlet(2, ts.getActivePackets());
	}
	public void inlet(float f) {
		ts.send(f);
		outlet(2, ts.getActivePackets());
	}
	public void list(Atom[] a) {
		ts.send(a);
		outlet(2, ts.getActivePackets());
	}
	public void anything(String s, Atom[] a) {
		ts.send(s,a);
		outlet(2, ts.getActivePackets());
	}
	
	private void success(Atom[] a) {
		outlet(2, ts.getActivePackets());
		outlet(0, a);
	}
	private void failure(Atom[] a) {
		outlet(2, ts.getActivePackets());
		outlet(1, a);
	}
	
	protected void notifyDeleted() {
		ts.close();
	}
}
