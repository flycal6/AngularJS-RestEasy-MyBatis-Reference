package com.learnstack.mappers;

import java.util.List;

import com.learnstack.entities.Car;

public interface CarMapper {

	public Car getCarById(int id);

	public List<Car> indexCars();

	public int insertCar(Car car);

	public void updateCar(Car car);

	public boolean deleteCar(int id);
}
