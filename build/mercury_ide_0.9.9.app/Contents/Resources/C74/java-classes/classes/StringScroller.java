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


public class StringScroller extends MaxObject implements Executable
{

    //Attributes
    int    loop = 0;
    double interval = 100;
    int    charmode = 0;
    int    size = 40;

   
    private boolean _on;
    private MaxQelem _q;
    private MaxClock _clk;
    private String _separator;
    private int _index;    
    private StringBuffer _buf;

    public StringScroller(Atom[] args)
    {
	declareInlets(new int[]{DataTypes.ALL});
	declareOutlets(new int[]{DataTypes.ALL,DataTypes.ALL});
	declareAttribute("loop");
	declareAttribute("interval");
	declareAttribute("charmode");
	declareAttribute("size");

	_buf = new StringBuffer();
	_clk = new MaxClock(this);
	_on = false;
	_separator = new String(" ");
	_index = 0;
	_q = new MaxQelem() {
		public void qfn()
		{
		    int len=_buf.length();
		    int end;
		    String s;
		    int offset;
		    int start;
		    int seplen;
		    
		    if (len>0) {
			
			switch (loop) {
			case 2:
			    start =_index%len;
			    
			    end = Math.min(start+size,len);
			    s = _buf.substring(start,end);
			    offset = end-start;
			    seplen = _separator.length();
			    
			    while (offset<size) {
				end = Math.min((size-offset)-seplen,len);
				s = s + _separator +  _buf.substring(0,end);
				offset += end + seplen;
			    }
			    _index++;
			    _index %= size;
			    break;
				case 1:    
				    if (_index>=len)
				    	_index = 0;
				    end = Math.min(_index+size,len);
				    s = _buf.substring(_index,end);
				    _index++;
				    break;
				default:
                                    if (_index>=len)
				    	_index = 0;
                                    end = Math.min(_index+size,len);
                                    s = _buf.substring(_index,end);
				    _index = 0;
				    _buf.deleteCharAt(0);
			}
			len = s.length();
				switch (charmode) {
				case 1:
				    for (int i=0;i<len;i++) {
						outlet(0,s.substring(i,i+1));
				    }
				    break;
				default:
					outlet(0,s);
				}	
		    } else {
			_index = 0;
		    }
		    outletBang(1);
		}	 	 
	    };
    }
    
    public void bang()
    {
	_on = (!_on);
	inlet((_on)?1:0);
    }

    public void inlet(int i)
    {
	if (i==0)
	    _clk.unset();
	else
	    _clk.delay(0);
	_on = (i!=0);
    }
    
    public void loop(int i)
    {
	switch (i) {
	case 2: // wrap
	case 1: // on
	case 0: // off
	    loop = i;
	    break;
	default:
	    loop = 1;
	}
    }

    public void interval(double d)
    {
	interval = (d>1)?d:1;
    }

    public void size(int i)
    {
	size = (i>0)?i:1;
    }

    public void add(Atom[] args)
    {
	for (int i=0;i<args.length;i++)
	    {
		if (_buf.length()>0)
		    _buf.append(_separator);
		_buf.append(args[i].toString());
	    }
    }
    
    public void execute()
    {
	_q.set();
	_clk.delay(interval);
    }

    public void clear()
    {
	_buf.delete(0,_buf.length());
    }

    public void separator()
    {
	separator("");
    }

    public void separator(String s)
    {
	_separator = s;
    }

    public void index(int i)
    {
	if (i<0) i=0;
	else if (i>=_buf.length()) i=0;
	_index = i;
    }
    
    protected void notifyDeleted() {
    	_clk.release();
    	_q.release();
    }


}
