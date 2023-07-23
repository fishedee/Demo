package spring_test;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import spring_test.business.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MyTenantUserDetails implements UserDetails {
    private static final long serialVersionUID = 4359709211352400087L;

    private String tenantId;

    private String name;

    private String password;

    private Long userId;

    private String role;

    public MyTenantUserDetails(String tenantId, User user){
        this.tenantId = tenantId;
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

    public String getTenantId(){
        return this.tenantId;
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
        if( obj instanceof MyTenantUserDetails){
            MyTenantUserDetails right = (MyTenantUserDetails) obj;
            return this.getUsername().equals(right.getUsername()) &&
                    this.getTenantId().equals(right.getTenantId());
        }else{
            return false;
        }
    }

    @Override
    public int hashCode(){
        String link = this.getTenantId()+"#"+this.getUsername();
        return link.hashCode();
    }
}
