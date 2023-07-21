package com.example.springapp.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.weaver.NewConstructorTypeMunger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.event.PublicInvocationEvent;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
	
	private UserDetailsService userDetailsService;
	private JWTTokenHelper jwtTokenHelper;
	
	public  JWTAuthenticationFilter(UserDetailsService userDetailsService,JWTTokenHelper jwtTokenHelper)
	{
		this.userDetailsService=userDetailsService;
		this.jwtTokenHelper=jwtTokenHelper;
	}
	
	
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authToken=jwtTokenHelper.getToken(request);
		
		if(authToken!=null)
		{
			String username=jwtTokenHelper.getUsernameFromToken(authToken);
			if(username!=null)
			{
				UserDetails userDetails =userDetailsService.loadUserByUsername(username);
				if(jwtTokenHelper.validateToken(authToken, userDetails))
				{
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
						
					usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetails(request));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
					
					
				
				}
			}
		}
		
		filterChain.doFilter(request, response);
		
		
	}
	
	

}
