package com.learnstack.utils;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/*
 * Creates a SqlSessionFactory based on the config file, and makes it
 * available through a public static method
 */

public class MyBatisUtil {
	private static SqlSessionFactory sqlSessionFactory;

	static {
		String resource = "mybatis-config.xml";
		InputStream inputStream;

		try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		} catch (IOException e) {
			System.out.println("SqlSessionFactory build failed.  Check location of config file.");
			e.printStackTrace();
		}

	}

	public static SqlSessionFactory getSqlSessionFactory() {
		return sqlSessionFactory;
	}
}
