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
 *
 * given an IP address as a symbol or a list gets a domain name
 * 
 * TODO abort a thread if an incoming message arrives before completion
 * 
 * created on 10-Apr-2004
 * @author bbn
 */
public class domain extends MaxObject {
	
	private class DomainGetter extends Thread implements Executable {
		String name = null;
		byte[] bytes = null;
		String hostname = null;
		boolean reportFlag = true;
		
		DomainGetter(String s) {
			name = s;
		}
		
		DomainGetter(byte[] b) {
			bytes = b;
		}
		
		public void run() {
			InetAddress ip;
			try {
				if (name!=null) {
					ip = InetAddress.getByName(name);
				} else {
					ip = InetAddress.getByAddress(bytes);
				}
				hostname = ip.getHostName();
				MaxQelem q = new MaxQelem(this);
				q.set();
			} catch (UnknownHostException e) {
				post("domain: unknown host");
			}
		}
		
		public void execute() {
//			post("reporting -- value of reportFlag is "+reportFlag);
			if (reportFlag)
				outlet(0, hostname);
		}
		
/*		public void report(boolean b) {
			reportFlag = b;
			post("report cancelled");
		}
*/	}
	
	private byte[] ipBytes = new byte[0];
	private String ipString = null;
	private boolean stringWasLast = true;
	private DomainGetter g = new DomainGetter("dummy");
		
	domain(Atom[] a) {
		declareInlets(new int[] {DataTypes.ALL});
		declareOutlets(new int[] {DataTypes.ALL});
		createInfoOutlet(false);
		if (a.length > 3) {
			ipBytes = convertInts(Atom.toInt(a));
			stringWasLast = false;
		} else if (a.length > 1) {
			ipString = a[0].toString();
			stringWasLast = true;
		}
	}
	
	public void bang() {
		if (stringWasLast) {
			if (ipString != null)
				returnDomain(ipString);
		} else {
			if (ipBytes.length > 0)
				returnDomain(ipBytes);
		}
	}

	public void list(Atom[] a) {
		ipBytes = convertInts(Atom.toInt(a));
		stringWasLast = false;
		returnDomain(ipBytes);
	}
	
	public void anything(String s, Atom[] a) {
		ipString = s;
		stringWasLast = true;
		returnDomain(ipString);
	}
	
/*	private void cancelG() {
		if (g.isAlive()) { 
			post("cancel report");
			g.report(false);
		}
	}
*/	
	private void returnDomain(String s) {
//		cancelG();
		DomainGetter g = new DomainGetter(s);
		g.start();
	}
	
	private void returnDomain(byte[] b) {
//		cancelG();
		DomainGetter g = new DomainGetter(b);
		g.start();
	}
	
	private byte[] convertInts(int[] i) {
		byte[] temp = new byte[i.length];
		for (int j=0;j<i.length;j++) {
			if (i[j]>127) 
				temp[j]=(byte)(i[j]-256);
			else
				temp[j]=(byte)i[j];
		}
		return temp;
	}
}
