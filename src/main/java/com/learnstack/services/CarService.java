package com.learnstack.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.ibatis.session.SqlSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnstack.entities.Car;
import com.learnstack.mappers.CarMapper;
import com.learnstack.utils.MyBatisUtil;

@Path("/cars")
public class CarService {
	
	@DELETE
	@Path("/delete/{id}")
	public boolean deleteCar(@PathParam("id") int id) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			CarMapper cm = session.getMapper(CarMapper.class);
			cm.deleteCar(id);
			session.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return false;
	}
	
	@PUT
	@Path("{id}")
	@Consumes("application/json")
	public void updateCar(@PathParam("id") int id, String carJson) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		ObjectMapper om = new ObjectMapper();
		try {
			Car car = om.readValue(carJson, Car.class);
			CarMapper cm = session.getMapper(CarMapper.class);
			cm.updateCar(car);
			session.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	
	@POST
	@Consumes("application/json")
	public int insertCar(String carJson) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		ObjectMapper om = new ObjectMapper();
		Car car;
		try {
			car = om.readValue(carJson, Car.class);
			CarMapper cm = session.getMapper(CarMapper.class);
			cm.insertCar(car);
			session.commit();
			return car.getId();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return -1;
	}

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Car getCarById(@PathParam("id") int id) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			CarMapper cm = session.getMapper(CarMapper.class);
			Car car = cm.getCarById(id);
			return car;
		} finally {
			session.close();
		}
	}
	
	@GET
	@Produces("application/json")
	public List<Car> indexCars(){
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			CarMapper cm = session.getMapper(CarMapper.class);
			List<Car> cars = cm.indexCars();
			return cars;
		} finally {
			session.close();
		}
	}
}
