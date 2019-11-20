import com.cycling74.max.*;
import com.cycling74.jitter.*;
import java.awt.image.*;
import javax.imageio.*;
import java.net.*;

// created by bbn on Feb 18, 2005
/**
 * downloads an image from the web and outputs it as a matrix
 *
 * @author bbn
 */
public class jitwebimage extends MaxObject 
{
	public void url(final String imgUrl) {
		
		(new Thread() {
			public String url;
			
			public void run() {
				try {
					URL u = new URL(imgUrl);
					BufferedImage bi = ImageIO.read(u);
					JitterMatrix j = new JitterMatrix(bi);
					outlet(0, "jit_matrix", j.getName());
				} catch (Exception e) {
					e.printStackTrace();
				}
			} 
		}).start();
	}
}


