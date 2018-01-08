package com.learnstack.mappers;

import java.util.Set;

import com.learnstack.entities.Driver;

public interface DriverMapper {

	public Driver showDriver(int id);

	public Set<Driver> indexDrivers();

	public int insertDriver(Driver d);

	public void updateDriver(Driver d);

	public boolean deleteDriver(int id);
}
