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

package list;
import com.cycling74.max.*;
/**
 * maintains a queue of atoms
 * 
 * created on 6-Apr-2004
 * @author bbn
 */
public class Queue extends ListProcessor {
	
	private static final int 	MESSAGE_IN = 0,
								VIP_IN = 1,
								NORMAL_IN = 2;
	private static final int		NORMAL_OUT = 0,
								STATUS_OUT = 1,
								INFO_OUT = 2;
								
	private Atom[] q = Atom.emptyArray;
	
	public boolean autoStatus = false;
	
	// TODO implement with a Vector to improve performance
	
	Queue() {
		declareIO(3, 2);
		setAutoSet(false);
		declareAttribute("autoStatus");
		declareAttribute("length","getLength","setLength");
	}
	
	public Atom[] getLength() {
		return new Atom[] {Atom.newAtom(q.length)};
	}
	
	public void setLength(Atom[] a) {
		error("list.Queue: you can't set the length.");
	}
	
	protected void input(int idx, Atom[] a) {
		setOutput(STATUS_OUT, Atom.emptyArray);
		switch (idx) {
			case MESSAGE_IN: message(a); break;
			case VIP_IN: vip(a); break;
			case NORMAL_IN: normal(a); break;
		}
		if (autoStatus)
			setOutput(STATUS_OUT, q);
		
		if (idx!=MESSAGE_IN)
			bang();
	}
	
	private void message(Atom[] a) {
		String msg = a[0].toString();
		if (msg.equalsIgnoreCase("out"))
			out(Atom.removeFirst(a));
		else if (msg.equalsIgnoreCase("pop"))
			pop(Atom.removeFirst(a)); 
		else if (msg.equalsIgnoreCase("dump"))
			dump();
		else if (msg.equalsIgnoreCase("status"))
			status();
		else if (msg.equalsIgnoreCase("reverse"))
			reverse();
		else if (msg.equalsIgnoreCase("flee"))
			flee();
		else if (msg.equalsIgnoreCase("reset"))
			reset();
		else if (msg.equalsIgnoreCase("shuffle"))
			shuffle();
	}
	
	private void normal(Atom[] a) {
		Atom[] newq = new Atom[q.length+a.length];
		System.arraycopy(q, 0, newq, 0, q.length);
		System.arraycopy(a, 0, newq, q.length, a.length);
		q=newq;
		setOutput(NORMAL_OUT, Atom.emptyArray);
	}
	
	private void vip(Atom[] a) {
		Atom[] newq = new Atom[q.length+a.length];
		System.arraycopy(q, 0, newq, a.length, q.length);
		System.arraycopy(a, 0, newq, 0, a.length);
		q=newq;
		setOutput(NORMAL_OUT, Atom.emptyArray);
	}

	private void out(Atom[] a) {
		if (a.length > 0) {
			int i = a[0].toInt();
			if (i > 0 ) 
				queueout(i);
			else 
				error("Queue: out message requires a positive integer argument");
		} else 
			queueout(1);
	}

	private void queueout(int i) {
		if (q.length > 0) {
			if (q.length < i)
				i = q.length;
			setOutput(NORMAL_OUT, Atom.removeLast(q, q.length-i));
			setOutput(STATUS_OUT, Atom.emptyArray);
			q = Atom.removeFirst(q, i);
		} else {
			setOutput(NORMAL_OUT, Atom.emptyArray);
			setOutput(STATUS_OUT, Atom.emptyArray);
		}
	}
	
	private void pop(Atom[] a) {
		if (a.length > 0) {
			int i = a[0].toInt();
			if (i > 0 ) 
				queuepop(i);
			else 
				error("Queue: pop message requires a positive integer argument");
		} else 
			queuepop(1);
	}
	
	private void queuepop(int i) {
		if (q.length > 0) {
			if (q.length < i)
				i = q.length;
			setOutput(NORMAL_OUT, Atom.reverse(Atom.removeFirst(q, q.length-i)));
			setOutput(STATUS_OUT, Atom.emptyArray);
			q = Atom.removeLast(q, i);
		} else {
			setOutput(NORMAL_OUT, Atom.emptyArray);
			setOutput(STATUS_OUT, Atom.emptyArray);
		}
	}
	
	private void dump() {
		queueout(q.length);
	}
	
	private void status() {
		setOutput(NORMAL_OUT, Atom.emptyArray);
		setOutput(STATUS_OUT, q);
	}
	
	private void reverse() {
		q = Atom.reverse(q);
		setOutput(NORMAL_OUT, Atom.emptyArray);
	}
	
	private void shuffle() {
		int looplen = q.length;
		Atom[] newq = new Atom[q.length];
		for (int i=0;i<looplen;i++) {
			int choice = (int)(Math.random()*((double)q.length));
			newq[i] = q[choice];
			q = Atom.removeOne(q, choice);
		}
		q = newq;
	}
	
	private void flee() {
		q = Atom.reverse(q);
		dump();
	}
	
	private void reset() {
		q = Atom.emptyArray;
		setOutput(NORMAL_OUT, q);
		setOutput(STATUS_OUT, q);
	}
}
