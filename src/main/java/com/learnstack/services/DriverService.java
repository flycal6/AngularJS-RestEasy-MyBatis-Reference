package com.learnstack.services;

import java.util.Set;

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
import com.learnstack.entities.Driver;
import com.learnstack.mappers.DriverMapper;
import com.learnstack.utils.MyBatisUtil;

@Path("/drivers")
public class DriverService {

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Driver showDriver(@PathParam("id") int id) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			DriverMapper dm = session.getMapper(DriverMapper.class);
			Driver d = dm.showDriver(id);
			return d;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return null;
	}

	@GET
	@Produces("application/json")
	public Set<Driver> indexDrivers() {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			DriverMapper dm = session.getMapper(DriverMapper.class);
			Set<Driver> drivers = dm.indexDrivers();
			return drivers;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return null;
	}

	@POST
	@Consumes("application/json")
	public int insertDriver(String driverJson) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		ObjectMapper om = new ObjectMapper();
		try {
			Driver d = om.readValue(driverJson, Driver.class);
			DriverMapper dm = session.getMapper(DriverMapper.class);
			dm.insertDriver(d);
			session.commit();
			return d.getId();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return -1;
	}

	@PUT
	@Path("/{id}")
	@Consumes("application/json")
	public void updateDriver(@PathParam("id") int id, String driverJson) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		ObjectMapper om = new ObjectMapper();
		try {
			Driver d = om.readValue(driverJson, Driver.class);
			if (id == d.getId()) {
				DriverMapper dm = session.getMapper(DriverMapper.class);
				dm.updateDriver(d);
				session.commit();
			} else {
				System.out.println("driver update failed: path doesn't match driver.id");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	@DELETE
	@Path("/delete/{id}")
	public boolean deleteDriver(@PathParam("id") int id) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			DriverMapper dm = session.getMapper(DriverMapper.class);
			dm.deleteDriver(id);
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
