package com.learnstack.services;

import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.ibatis.session.SqlSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnstack.entities.Race;
import com.learnstack.mappers.RaceMapper;
import com.learnstack.utils.MyBatisUtil;

@Path("/races")
public class RaceService {

	@GET
	@Produces("application/json")
	public Set<Race> indexRaces(){
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			RaceMapper rm = session.getMapper(RaceMapper.class);
			Set<Race> races = rm.indexRaces();
			return races;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return null;
	}

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Race showRace(@PathParam("id") int id) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		try {
			RaceMapper rm = session.getMapper(RaceMapper.class);
			Race race = rm.showRace(id);
			return race;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return null;
	}
	
	@POST
	@Consumes("application/json")
	public int insertRace(String raceJson) {
		SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
		ObjectMapper om = new ObjectMapper();
		try {
			Race r = om.readValue(raceJson, Race.class);
			RaceMapper rm = session.getMapper(RaceMapper.class);
			rm.insertRace(r);
			session.commit();
			return r.getId();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return -1;
	}

}
