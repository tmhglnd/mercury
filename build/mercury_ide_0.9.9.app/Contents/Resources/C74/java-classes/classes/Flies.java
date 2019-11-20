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

import java.util.Random;

public class Flies extends MaxObject
{
 

Random nrand;
int NF          = 30;
int REVDIST     = 2000000;
int ACC         = 30;
int ACCTOMID    = 10;
int MAXSPEED    = 500;
int BOUNCESPEED = 80;
int[] flyx;
int[] flyy;
int[] flyz;
int[] flyvx;
int[] flyvy;
int[] flyvz;
int[][] flyn;
int[] lpx;
int[] lpy;
int[] lpz;
int[] lp2x;
int[] lp2y;
int[] lp2z;
int WIDTH,HEIGHT,DEPTH,ZOOM;
int j;

    private MaxQelem _q;
    public Flies(Atom[] args)
    {
	declareInlets(new int[]{ DataTypes.MESSAGE  });
	declareOutlets(new int[]{ DataTypes.MESSAGE, DataTypes.MESSAGE });
	declareAttribute("NF",null,"setNumFlies");
	declareAttribute("REVDIST",null,"setREVDIST");
	declareAttribute("ACC",null,"setACC");
	declareAttribute("ACCTOMID",null,"setACCTOMID");
	declareAttribute("MAXSPEED",null,"setMAXSPEED");
	declareAttribute("BOUNCESPEED",null,"setBOUNCESPEED");

	_q = new MaxQelem(this, "qfn");


	init();
       
    }
    
    private void qfn()
	{
	    
	    clear(new Atom[]{});
	    for (int i=0;i<NF;i++)
		{
		    doneighbours(i);
		    processfly(i);
		}
	    if (rand(20)==0) randemize();
	    _draw_flies();
	}

    private void setREVDIST(float x)
    {
	REVDIST = (int)(x * 2000000);
    }

    private void setACC(float x)
    {
	ACC = (int)(x * 30);
    }

    private void setACCTOMID(float x)
    {
	ACCTOMID = (int)(x * 10);
    }

    private void setMAXSPEED(float x)
    {
	MAXSPEED = (int)(x * 500);

    }

    private void setBOUNCESPEED(float x)
    {
	BOUNCESPEED = (int)(x * 80);
    }

    private void setNumFlies(int x)
    {
	NF = x;
	init();
    }

    private int rand(int range)
    {
	return( java.lang.Math.abs(nrand.nextInt()) % range);
    }

    
    private void init() 
    {
	nrand=new Random(0); 

	flyx = new int[NF*3+1];
	flyy = new int[NF*3+1];
	flyz = new int[NF*3+1];
	flyvx = new int[NF*3+1];
	flyvy = new int[NF*3+1];
	flyvz = new int[NF*3+1];
	flyn = new int[NF*3+1][2];
	lpx = new int[NF*3+1];
	lpy = new int[NF*3+1];
	lpz = new int[NF*3+1];
	lp2x = new int[NF*3+1];
	lp2y = new int[NF*3+1];
	lp2z = new int[NF*3+1];
	WIDTH=400;
	HEIGHT=400;
	DEPTH=(WIDTH+HEIGHT)/2;
	ZOOM=2*DEPTH/3;
	for(int i=0;i<NF*3;i++)
	    {
		lpx[i]=flyx[i]=rand(WIDTH-60)*100+3000;
		lpy[i]=flyy[i]=rand(HEIGHT-60)*100+3000;
		lpz[i]=flyz[i]=rand(DEPTH-60)*100+3000;
		flyvx[i]= rand(500)-200;
		flyvy[i]= rand(500)-200;
		flyvz[i]= rand(500)-200;
	    }
	randemize();
    }
    

    private void processfly(int tick)
    {
	// rev determines whether the neighbour attracts or repels, ACC is the acceleration amount
	// lpx & lpy are the last positions of the fly for drawing purposes.
	// REVDIST is the minimum distance squared that the flies can get to without repelling
	// tick is the fly number being processed. flyvx&y are the velocities in x and y directions
	// ACCTOMID is the acceleration towards the middle to attempt to keep the flies in the
	// middle of the display.
	lpx[tick]=flyx[tick];
	lpy[tick]=flyy[tick];
	lpz[tick]=flyz[tick];
	int rev=1;
	if (dist(tick,flyn[tick][0])<REVDIST)
	    rev=-1;
	if (flyx[tick]<flyx[flyn[tick][0]])
	    flyvx[tick]+=ACC*rev;
	else
	    flyvx[tick]-=ACC*rev;
	if (flyy[tick]<flyy[flyn[tick][0]])
	    flyvy[tick]+=ACC*rev;
	else
	    flyvy[tick]-=ACC*rev;
	if (flyz[tick]<flyz[flyn[tick][0]])
	    flyvz[tick]+=ACC*rev;
	else
	    flyvz[tick]-=ACC*rev;
	rev=1;
	if (dist(tick,flyn[tick][1])<REVDIST)
	    rev=-1;
	if (flyx[tick]<flyx[flyn[tick][1]])
	    flyvx[tick]+=ACC*rev;
	else
	    flyvx[tick]-=ACC*rev;
	if (flyy[tick]<flyy[flyn[tick][1]])
	    flyvy[tick]+=ACC*rev;
	else
	    flyvy[tick]-=ACC*rev;
	if (flyz[tick]<flyz[flyn[tick][1]])
	    flyvz[tick]+=ACC*rev;
	else
	    flyvz[tick]-=ACC*rev;
	if (flyvx[tick]>MAXSPEED) flyvx[tick]=MAXSPEED;
	if (flyvx[tick]<-MAXSPEED) flyvx[tick]=-MAXSPEED;
	if (flyvy[tick]>MAXSPEED) flyvy[tick]=MAXSPEED;
	if (flyvy[tick]<-MAXSPEED) flyvy[tick]=-MAXSPEED;
	if (flyvz[tick]>MAXSPEED) flyvz[tick]=MAXSPEED;
	if (flyvz[tick]<-MAXSPEED) flyvz[tick]=-MAXSPEED;
	if (flyx[tick]<0) flyvx[tick]=BOUNCESPEED;
	if (flyx[tick]>WIDTH*100) flyvx[tick]=-BOUNCESPEED;
	if (flyy[tick]<0) flyvy[tick]=BOUNCESPEED;
	if (flyy[tick]>HEIGHT*100) flyvy[tick]=-BOUNCESPEED;
	if (flyz[tick]<0) flyvz[tick]=BOUNCESPEED;
	if (flyz[tick]>DEPTH*100) flyvz[tick]=-BOUNCESPEED;
	if (flyx[tick]<WIDTH*50) flyvx[tick]+=ACCTOMID;
	if (flyx[tick]>WIDTH*50) flyvx[tick]-=ACCTOMID;
	if (flyy[tick]<HEIGHT*50) flyvy[tick]+=ACCTOMID;
	if (flyy[tick]>HEIGHT*50) flyvy[tick]-=ACCTOMID;
	if (flyz[tick]<DEPTH*50) flyvz[tick]+=ACCTOMID;
	if (flyz[tick]>DEPTH*50) flyvz[tick]-=ACCTOMID;
	flyx[tick]+=flyvx[tick];
	flyy[tick]+=flyvy[tick];
	flyz[tick]+=flyvz[tick];
	
    }

    private void doneighbours(int tick)
    {
	// this re-assigns neighbours if the neighbour's neighbours are closer to the fly than the
	// neighbours.
	int k,l,m;
	for (k=0;k<2;k++)
	    {
		m=flyn[tick][k];
		for (l=0;l<2;l++)
		    {
			if (dist(flyn[m][l],tick)<dist(flyn[tick][0],tick))
			    {
				if (flyn[m][l]!=flyn[tick][1])
				    flyn[tick][0]=flyn[m][l];
			    }
			if (dist(flyn[m][l],tick)<dist(flyn[tick][1],tick))
			    {
				if (flyn[m][l]!=flyn[tick][0])
				    flyn[tick][1]=flyn[m][l];
			    }
		    }
	    }
	for (k=0;k<2;k++)
	    {
		// this bit randomises the flies neighbour if it 
		//has been assigned itself as a neighbour
		if (flyn[tick][k]==tick) flyn[tick][k]=(int) (rand(NF));
	    }
    }
    
    // distance between flies function
    private long dist(int tick1,int tick2)
    {
	long d;
	int d1,d2,d3;
	d1=((int)(flyx[tick1]-flyx[tick2]));
	d2=((int)(flyy[tick1]-flyy[tick2]));
	d3=((int)(flyz[tick1]-flyz[tick2]));
	d=d1*d1+d2*d2+d3*d3;
	return(d);
    }
    
    // randomises the neighbours
    private void randemize()
    {
	int k;
	for (k=0;k<NF;k++)
	    {
		flyn[k][0]=(int) (rand(NF));
		flyn[k][1]=(int) (rand(NF));
	    }
    }


    public void bang()
    {
	_q.set();

	
    }

    private void _draw_flies()
    {

	int k;
	int[] x,y;
	int a1,a2,a3,a4,azx,azy;
	float lz,lz2;
	x=new int[4];
	y=new int[4];
	for (k=0;k<NF;k++)
	    {
		lz=(float)(lpz[k]/100)/(float)(ZOOM*1.5); 
		lz2=(float)(flyz[k]/100)/(float)(ZOOM*1.5); 
		int midx=WIDTH/2; 
		int midy=HEIGHT/2; 
		a1=midx+(int)((lpx[k]/100-midx)/lz); 
		a2=midy+(int)((lpy[k]/100-midy)/lz); 
		a3=midx+(int)((flyx[k]/100-midx)/lz2); 
		a4=midy+(int)((flyy[k]/100-midy)/lz2);
		azx = a1+(a3-a1)*2/3;
		azy = a2+(a4-a2)*2/3;
		x[0]=a1; y[0]=a2; x[2]=a3; y[2]=a4;
		x[1]=(int)(azx)+(int)((a4-a2)/4); x[3]=(int)(azx)-(int)((float)(a4-a2)/4);
		y[1]=(int)(azy)-(int)((a3-a1)/4); y[3]=(int)(azy)+(int)((float)(a3-a1)/4);
		if (Math.abs(x[1]-x[3]) < 2 && 
		    Math.abs(y[1]-y[3]) < 2)
		    { 
			outlet(0,"linesegment", new Atom[]{Atom.newAtom(midx+(int)((lpx[k]/100-midx)/lz)),
							   Atom.newAtom( midy+(int)((lpy[k]/100-midy)/lz)), 
							   Atom.newAtom(midx+(int)((flyx[k]/100-midx)/lz2)),
							   Atom.newAtom(midy+(int)((flyy[k]/100-midy)/lz2))});
			
		    }
		else 
		    {
			outlet(0,"paintpoly",new Atom[]{Atom.newAtom(x[0]),Atom.newAtom(y[0]),
							Atom.newAtom(x[1]),Atom.newAtom(y[1]),
							Atom.newAtom(x[2]),Atom.newAtom(y[2]),
							Atom.newAtom(x[3]),Atom.newAtom(y[3]),
							Atom.newAtom(x[0]),Atom.newAtom(y[0])});
		    }
		outlet(1,new Atom[]{Atom.newAtom(k),
				    Atom.newAtom((float)(flyx[k] - (float)3000) / 34000),
				    Atom.newAtom((float)(flyy[k] - (float)3000) / 34000),
				    Atom.newAtom((float)(flyz[k] - (float)3000) / 34000)});
}
    }


    public void clear(Atom[] args)
    {
	outlet(0,"clear",args);

    }

   protected void notifyDeleted() {
   	_q.release();
   }

}

