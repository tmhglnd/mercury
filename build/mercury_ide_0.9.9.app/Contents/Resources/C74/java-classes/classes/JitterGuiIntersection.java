// Created on 1-Sep-2005
/**
 * @author bbn
 *
 * intersection is a class used by tracker to store data during the
 * hit-test phase
 */
public class JitterGuiIntersection implements Comparable {
	public boolean prevIntersect = false;
	public boolean intersect = false;
	public float where[] = new float[] {0.0f,0.0f,0.0f};	
	public JitterGuiElement element;
	public float distance = 0.f;
	
	public int compareTo(Object o)
	{
		JitterGuiIntersection i = (JitterGuiIntersection)o;
		if (distance > i.distance)
			return 1;
		if (distance < i.distance)
			return -1;
		else return 0;
	}	
}
