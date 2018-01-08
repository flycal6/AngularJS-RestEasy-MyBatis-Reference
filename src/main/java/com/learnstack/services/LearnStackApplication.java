package com.learnstack.services;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/services")
public class LearnStackApplication extends Application {
	
	private Set<Object> singletons = new HashSet<>();
	private Set<Class<?>> empty = new HashSet<>();
	
	/*
	 * Add an instance of all services to `singletons` Set from within constructor
	 */
	
	public LearnStackApplication() {
		singletons.add(new CarService());
		singletons.add(new DriverService());
		singletons.add(new RaceService());
	}

	@Override
	public Set<Class<?>> getClasses() {
		return super.getClasses();
	}

	@Override
	public Map<String, Object> getProperties() {
		return super.getProperties();
	}

	@Override
	public Set<Object> getSingletons() {
		return super.getSingletons();
	}
	
	
}
