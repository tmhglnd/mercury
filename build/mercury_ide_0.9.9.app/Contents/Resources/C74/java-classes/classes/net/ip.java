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

package net;
import com.cycling74.max.*;
import java.net.*;

/**
 * returns the IP given a domain name
 * 
 * TODO have the search happen in a separate thread
 * TODO possible to separate the errors that results from not
 * being connected to the net from the ones that result from a 
 * bad domain name?
 * 
 * created on 10-Apr-2004
 * @author bbn
 */
public class ip extends MaxObject {
	
	private class IpGetter extends Thread implements Executable {
		String name = null;
		String host = null;
		int[] b = null;
		
		IpGetter(String s) {
			name = s;
		}
		
		public void run() {
			try {
				InetAddress ip = InetAddress.getByName(name);
				b = convertBytes(ip.getAddress());
				host = ip.getHostAddress();
				MaxQelem q = new MaxQelem(this);
				q.set();
			} catch (UnknownHostException e) {
				post("getIP: unknown host exception");
			} catch (SecurityException e) {
				post("getIP: security exception");
			}
		}
		
		public void execute() {
			outlet(1, b);
			outlet(0, host);
		}
		private int[] convertBytes(byte[] b) {
			int[] temp = new int[b.length];
			for (int i=0;i<b.length;i++) {
				if (b[i]<0) 
					temp[i]=b[i]+256;
				else
					temp[i]=b[i];
		}
			return temp;
	}

	}

	String name = null;
	
	ip(Atom[] a) {
		declareIO(1, 2);
		createInfoOutlet(false);
		setInletAssist(0, "(symbol) domain name");
		setOutletAssist(0, "(symbol) IP as a symbol");
		setOutletAssist(1, "(list) IP as a list of integers");
		if (a.length > 0)
			name = Atom.toOneString(a);
	}
	
	public void bang() {
		if (name != null)
			returnIP(name);
	}

	public void anything(String s, Atom[] a) {
		name = s;
		returnIP(s);
	}
	
	private void returnIP(String s) {
		IpGetter ipg = new IpGetter(s);
		ipg.start();
	}
	

}