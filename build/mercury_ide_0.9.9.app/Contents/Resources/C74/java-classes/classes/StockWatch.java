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

import com.cycling74.max.*;
import java.net.*;
import java.io.*;
import java.util.Hashtable;
import java.util.Vector;
import java.util.Enumeration;

//finance.yahoo.com/d/quotes.csv?f=sl1d1t1c1ohgv&e=.csv&s=INTC+SUNW

public class StockWatch extends MaxObject implements Runnable, Executable
{
    //Attributes
    double    interval = 30 * 1000; //30 seconds

    static final int SYM        = 0;
    static final int LAST_TRADE = 1;
    static final int DAY        = 2;
    static final int TIME       = 3;
    static final int CHANGE     = 4;
    
    private String    _base_url     = "http://finance.yahoo.com/d/quotes.csv?f=sl1d1t1c1ohgv&e=.csv";
    private String    _sym_string   = "&s=";
    private Hashtable _syms;
    private boolean   _first_sym = true;
    private Thread    _t;
    private MaxClock  _cl;
    

    public StockWatch(Atom[] args)
    {
	declareInlets(new int[]{DataTypes.ALL});
	declareOutlets(new int[]{DataTypes.ALL});
	declareAttribute("interval","_get_interval","_set_interval");
	//virtual attribute
	declareAttribute("quotes","_get_quotes","_set_quotes");

	_syms = new Hashtable();
	_cl = new MaxClock(this);
    }
    
    private void _set_interval(int i)
    {
	interval = i * 1000;
    }

    private Atom[] _get_interval()
    {
	return new Atom[]{Atom.newAtom((float)interval / 1000)};
    }

    private void _set_quotes(Atom[] args)
    {
	_syms.clear();
	for(int i = 0; i < args.length; i++)
	    {
		if(args[i].isString())
		    _add_quote(args[i].toString());
		else
		    System.out.println("Invalid Symbol: "+args[i].toString());
	    }
    }

    private Atom[] _get_quotes()
    {
	Enumeration e = _syms.keys();
	Vector  tmp   = new Vector();
	Atom[] ret = null;
	while(e.hasMoreElements())
		tmp.addElement(Atom.newAtom((String)e.nextElement()));
	
	ret = new Atom[tmp.size()];
	for(int i = 0; i < tmp.size();i++)
	    ret[i] = (Atom)tmp.elementAt(i);
	
	return ret;
    }


    public void bang()
    {
	_cl.delay(0);
    }
    
    public void stop()
    {
	_cl.unset();
    }

    public void clear()
    {
	_syms.clear();
    }

        
    public void addQuote(String quote)
    {
	_add_quote(quote);
    }

    public void removeQuote(String quote)
    {
	quote = quote.toUpperCase();
	if(_syms.containsKey(quote))
	    _syms.remove(quote);
    }


    public void execute()
    {

	_t = new Thread(this);
	try{
	    _t.start();
	}catch(Exception e)
	    {
		e.printStackTrace();
	    }

	_cl.delay(interval);
    }

    public void run()
    {
	_do_lookup();
	Enumeration e = _syms.keys();
	outlet(0,"BEGIN");
	while(e.hasMoreElements())
	    {
		String[] nfo = (String[])_syms.get(e.nextElement());
		Atom[] list = new Atom[]{Atom.newAtom(nfo[0]),Atom.newAtom(nfo[1]),
					 Atom.newAtom(nfo[2]),Atom.newAtom(nfo[3]),
					 Atom.newAtom(nfo[4])};
		outlet(0,list);
	    }
	outlet(0,"END");

    }

    private void _add_quote(String sym)
    {
	sym = sym.toUpperCase();
	if(!_syms.containsKey(sym))
	    {
		_syms.put(sym, new String[5]);
	    }
    }
    
    private void _do_lookup()
    {
	try{
	    String url = genURL();
	    int c;
	    URL u = new URL(url);
	    BufferedInputStream in = new BufferedInputStream(u.openStream());
	    StringBuffer sb = new StringBuffer();
	    while((c = in.read()) != -1)
		{
		    if(c == (int)'\n')
			{
			    _stuff_into_hash(sb.toString());
			    sb.setLength(0);
			    continue;
			}
		    sb.append((char)c);
		}

	    in.close();
	}catch(Exception e)
	    {
		e.printStackTrace();
	    }
    }
    
    private String genURL()
    {
	Enumeration e = _syms.keys();
	int cnt = 0;
	StringBuffer ret = new StringBuffer(_base_url);
	while(e.hasMoreElements())
	    {
		if(cnt == 0)
		    ret.append(_sym_string+(String)e.nextElement());
		else
		    ret.append("+"+(String)e.nextElement());
		cnt++;
	    }
	return ret.toString();
    }

    //indexOf(StringB str, intB fromIndex);     
    private void _stuff_into_hash(String line)
    {
	byte[] b = line.getBytes();
	StringBuffer word = new StringBuffer();
	int idx = 0;
	String key = null;

	for(int i = 0; i < b.length;i++)
	    {
		if(idx >= 5)
		    break;
		if(b[i] == (byte)'"')
		    continue; //skip quotes
		else if(b[i] == (byte)',' && idx == 0) //first word
		    {
			key = word.toString();
			((String[])(_syms.get(key)))[idx] = word.toString();
			idx++;
			word.setLength(0);
			continue;
		    }
		else if(b[i] == (byte)',')
		    {
			((String[])(_syms.get(key)))[idx] = word.toString();
			idx++;
			word.setLength(0);		
			continue;
		    }
		word.append((char)b[i]);
	    }
    }

    protected void notifyDeleted() {
    	_cl.release();
    }

    
}
