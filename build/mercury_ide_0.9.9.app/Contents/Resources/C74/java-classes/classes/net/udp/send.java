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

package net.udp;
import com.cycling74.max.*;
import com.cycling74.net.*;

public class send extends MaxObject {

	private UdpSender us;
	
    send(Atom args[]) {
	    	declareIO(1, 0);
	    	setInletAssist(0, "(anything) message to send to group");
	    	declareAttribute("address", "getAddress", "setAddress");
	    	declareAttribute("port", "getPort", "setPort");
	    us = new UdpSender();
    }
    
    private void setAddress(String s) {
    		us.setAddress(s);
    }
    private Atom[] getAddress() {
    		return new Atom[] {Atom.newAtom(us.getAddress())};
    }
    
    private void setPort(int i) {
    		us.setPort(i);
    }
    private Atom[] getPort() {
    		return new Atom[] {Atom.newAtom(us.getPort())};
    }
    
 	public void inlet(int i) {
		us.send(i);
	}
	public void inlet(float f) {
		us.send(f);
	}
	public void list(Atom[] a) {
		us.send(a);
	}
	public void anything(String s, Atom[] a) {
		us.send(s,a);
	}
}