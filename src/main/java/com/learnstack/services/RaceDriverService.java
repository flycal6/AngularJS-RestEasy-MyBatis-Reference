package com.learnstack.services;

import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.ibatis.session.SqlSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnstack.entities.Driver;
import com.learnstack.mappers.RaceDriverMapper;
import com.learnstack.utils.MyBatisUtil;

@Path("/race-drivers")
public class RaceDriverService {
	
	@PUT
	@Path("/{rid}")
	@Consumes("application/json")
	public void addDriversToRace(String driverJson, @PathParam("rid") int rid) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		ObjectMapper om = new ObjectMapper();
		try {
			List<Driver> drivers = Arrays.asList(om.readValue(driverJson, Driver[].class));
//			for (Driver driver : drivers) {
//				System.out.println(drivers);
//			}
			
			RaceDriverMapper rdm = session.getMapper(RaceDriverMapper.class);
			rdm.addDriversToRace(drivers, rid);
			session.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	
	@DELETE
	@Path("/race/{rid}/driver/{did}")
	@Produces("application/json")
	public boolean removeDriverFromRace(@PathParam("rid") int raceId, @PathParam("did") int driverId) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			RaceDriverMapper rdm = session.getMapper(RaceDriverMapper.class);
			rdm.removeDriverFromRace(raceId, driverId);
			session.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return false;
	}
}
