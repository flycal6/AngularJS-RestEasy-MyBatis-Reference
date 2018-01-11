package com.learnstack.mybatistests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.learnstack.entities.Car;
import com.learnstack.services.CarService;

public class CarServiceTest {

	private static CarService carService;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		carService = new CarService();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		carService = null;
	}

	@Test
	public void smokeTest() {
		boolean bool = true;
		assertEquals(true, bool);
	}

	@Test
	public final void testGetCarById() {
		Car car = carService.getCarById(1);
		assertNotNull(car);
		assertEquals(1, car.getId());
		assertEquals("Toyota", car.getMake());
		assertEquals("Tacoma", car.getModel());

		car = carService.getCarById(2);
		assertNotNull(car);
		assertEquals(2, car.getId());
		assertEquals("Jeep", car.getMake());
		assertEquals("Grand Cheerokee", car.getModel());

		car = null;
	}

	@Test
	public void testIndexCars() {
		List<Car> cars = carService.indexCars();
		assertTrue(cars.size() > 1);
		assertNotNull(cars.get(0));
		assertNotNull(cars.get(1));
	}

	@Test
	public void testInsertUpdateDelete() {
		int numCars = carService.indexCars().size();
		String carJson = "{\r\n" + "	\"make\" : \"Tesla\",\r\n" + "	\"model\" : \"Model 3\"\r\n" + "}";
		int newCarId = carService.insertCar(carJson);
		assertTrue(numCars + 1 == carService.indexCars().size());

		carJson = "{\r\n" + "	\"id\" : " + newCarId + ",\r\n" + "	\"make\" : \"Tesla\",\r\n"
				+ "	\"model\" : \"Model S\"\r\n" + "}";
		carService.updateCar(newCarId, carJson);
		assertTrue(carService.getCarById(newCarId).getModel().equals("Model S"));
		// assertEquals("Model S", carService.getCarById(newCarId).getModel());

		boolean deleted = carService.deleteCar(newCarId);
		assertTrue(deleted);
		assertTrue(numCars == carService.indexCars().size());
	}
}
