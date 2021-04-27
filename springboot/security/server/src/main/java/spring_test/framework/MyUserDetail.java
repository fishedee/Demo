package spring_test.framework;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import spring_test.business.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by fish on 2021/4/26.
 */
//UserDetail需要序列化的,要确保每个字段都可以被序列化.
public class MyUserDetail implements UserDetails {
    private static final long serialVersionUID = 4359709211352400087L;

    private String name;

    private String password;

    private Long userId;

    private String role;

    public MyUserDetail(User user){
        this.name = user.getName();
        this.password = user.getPassword();
        this.userId = user.getId();
        this.role = user.getRole().toString();
    }

    public Collection<? extends GrantedAuthority> getAuthorities(){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.role));
        return authorities;
    }

    public Long getUserId(){
        return this.userId;
    }

    public String getPassword(){
        return this.password;
    }

    public String getUsername(){
        return this.name;
    }

    public boolean isAccountNonExpired(){
        return true;
    }

    public boolean isAccountNonLocked(){
        return true;
    }

    public boolean isCredentialsNonExpired(){
        return true;
    }

    public boolean isEnabled(){
        return true;
    }

    @Override
    public boolean equals(Object obj){
        if( obj instanceof MyUserDetail ){
            return this.getUsername().equals(((MyUserDetail) obj).getUsername());
        }else{
            return false;
        }
    }

    @Override
    public int hashCode(){
        return this.getUsername().hashCode();
    }
}
