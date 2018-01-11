package com.learnstack.mappers;

import java.util.Set;

import com.learnstack.entities.Race;

public interface RaceMapper {

	public Set<Race> indexRaces();

	public Race showRace(int id);

	public int insertRace(Race r);

	public void updateRace(Race r);

	public boolean deleteRace(int id);
}
