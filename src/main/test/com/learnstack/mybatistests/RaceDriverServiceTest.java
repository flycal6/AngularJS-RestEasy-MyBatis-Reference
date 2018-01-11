package com.learnstack.mybatistests;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnstack.entities.Driver;
import com.learnstack.mappers.DriverMapper;
import com.learnstack.services.DriverService;
import com.learnstack.services.RaceDriverService;
import com.learnstack.services.RaceService;

public class RaceDriverServiceTest {

	private static RaceDriverService rds;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		rds = new RaceDriverService();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		rds = null;
	}
	
	@Test
	public final void smokeTest() {
		boolean bool = true;
		assertTrue(bool);
	}

	@Test
	public final void testAddAndRemoveDriversToRace() {
		Driver d = new DriverService().showDriver(1);
		assertNotNull(d);
		
		RaceService rs = new RaceService();
		int numRaceDrivers = rs
				.showRace(1)
				.getDrivers()
				.size();
		ObjectMapper om = new ObjectMapper();
		try {
			String dStr = om.writeValueAsString(d);
			dStr = "[" + dStr + "]";
			rds.addDriversToRace(dStr, 1);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		assertTrue(numRaceDrivers + 1 == rs.showRace(1).getDrivers().size());
		
		assertTrue(rds.removeDriverFromRace(1, 1));
		assertTrue(numRaceDrivers == rs.showRace(1).getDrivers().size());
	}


}
