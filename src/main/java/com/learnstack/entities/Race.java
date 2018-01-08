package com.learnstack.entities;

import java.util.Set;

public class Race {
	
	private int id;
	private String name;
	private Set<Driver> drivers;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<Driver> getDrivers() {
		return drivers;
	}
	public void setDrivers(Set<Driver> drivers) {
		this.drivers = drivers;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Race [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", drivers=");
		builder.append(drivers);
		builder.append("]");
		return builder.toString();
	}
	
}
