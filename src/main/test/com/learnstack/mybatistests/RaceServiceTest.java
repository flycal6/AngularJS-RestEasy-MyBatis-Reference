package com.learnstack.mybatistests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Collection;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.learnstack.entities.Race;
import com.learnstack.services.RaceService;

public class RaceServiceTest {
	
	private static RaceService rs;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		rs = new RaceService();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		rs = null;
	}

	@Test
	public void smokeTest() {
		boolean bool = true;
		assertEquals(true, bool);
	}

	@Test
	public final void testIndexRaces() {
		Collection<Race> races = rs.indexRaces();
		assertTrue(races.size() > 1);
	}

	@Test
	public final void testShowRace() {
		Race r = rs.showRace(1);
		assertNotNull(r);
		assertEquals(1, r.getId());
		assertEquals("Brickyard 400", r.getName());
	}

	@Test
	public final void testInsertRace() {
		int numRaces = rs.indexRaces().size();
		String raceJson = "{\r\n" + 
				"	\"name\": \"Detroit Grand Prix\"\r\n" + 
				"}";
		int newRaceId = rs.insertRace(raceJson);
		assertTrue(numRaces + 1 == rs.indexRaces().size());
		assertEquals("Detroit Grand Prix", rs.showRace(newRaceId).getName());

		raceJson = "{\r\n" + 
				"	\"id\" : " + newRaceId + ",\r\n" +
				"	\"name\": \"Belle Isle Grand Prix\"\r\n" +
				"}";
		rs.updateRace(newRaceId, raceJson);
		assertEquals("Belle Isle Grand Prix", rs.showRace(newRaceId).getName());

		boolean deleted = rs.deleteRace(newRaceId);
		assertTrue(deleted);
		assertTrue(numRaces == rs.indexRaces().size());
	}

}
