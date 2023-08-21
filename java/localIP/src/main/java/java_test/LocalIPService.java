package java_test;

import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.util.Enumeration;

@Component
public class LocalIPService {
    public void getByLocalHost(){
        try {
            InetAddress localhost = InetAddress.getLocalHost();
            System.out.println("Local IP Address: " + localhost.getHostAddress());
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }

    public void getByNetworkInterface(){
        try {
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();
            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();
                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    if (!inetAddress.isLoopbackAddress() && inetAddress.isSiteLocalAddress()) {
                        System.out.println("Local IP Address: " + networkInterface.getName()+" : "+inetAddress.getHostAddress());
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
