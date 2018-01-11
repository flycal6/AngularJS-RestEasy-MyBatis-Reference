package com.learnstack.mybatistests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Collection;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.learnstack.entities.Driver;
import com.learnstack.services.DriverService;

public class DriverServiceTest {

	private static DriverService driverService;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		driverService = new DriverService();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		driverService = null;
	}

	@Test
	public void smokeTest() {
		boolean bool = true;
		assertEquals(true, bool);
	}
	
	@Test
	public final void testShowDriver() {
		Driver d = driverService.showDriver(1);
		assertNotNull(d);
		assertEquals(1, d.getId());
		assertEquals("Ricky", d.getfName());
	}

	@Test
	public final void testIndexDrivers() {
		Collection<Driver> drivers = driverService.indexDrivers();
		assertTrue(drivers.size() > 1);
	}

	@Test
	public final void testInsertUpdateDeleteDriver() {
		int numDrivers = driverService.indexDrivers().size();
		String driverJson = "{\r\n" + 
				"	\"fName\": \"Dick\",\r\n" + 
				"	\"lName\": \"Trickle\",\r\n" + 
				"	\"car\": {\r\n" + 
				"		\"id\": \"4\",\r\n" + 
				"		\"make\": \"Honda\",\r\n" + 
				"		\"model\": \"RAV4\"\r\n" + 
				"	}\r\n" + 
				"}";
		int newDriverId = driverService.insertDriver(driverJson);
		assertTrue(numDrivers + 1 == driverService.indexDrivers().size());
		assertEquals("Trickle", driverService.showDriver(newDriverId).getlName());
		
		driverJson = "{\r\n" + 
				"	\"id\" : " + newDriverId + ",\r\n" +
				"	\"fName\": \"Dick\",\r\n" + 
				"	\"lName\": \"Dickers\",\r\n" + 
				"	\"car\": {\r\n" + 
				"		\"id\": \"4\",\r\n" + 
				"		\"make\": \"Honda\",\r\n" + 
				"		\"model\": \"RAV4\"\r\n" + 
				"	}\r\n" + 
				"}";
		driverService.updateDriver(newDriverId, driverJson);
		assertEquals("Dickers", driverService.showDriver(newDriverId).getlName());
		
		boolean deleted = driverService.deleteDriver(newDriverId);
		assertTrue(deleted);
		assertTrue(numDrivers == driverService.indexDrivers().size());
	}

}
