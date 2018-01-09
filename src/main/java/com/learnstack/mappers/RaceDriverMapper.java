package com.learnstack.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.learnstack.entities.Driver;

public interface RaceDriverMapper {

	public void addDriversToRace(@Param("drivers") List<Driver> drivers, @Param("race_id") int raceId);
	
	public boolean removeDriverFromRace(@Param("raceId") int raceId, @Param("driverId") int driverId);
}
