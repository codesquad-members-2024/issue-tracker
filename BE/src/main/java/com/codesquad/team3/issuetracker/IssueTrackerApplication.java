package com.codesquad.team3.issuetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@SpringBootApplication
@EnableJdbcAuditing
@EnableJdbcRepositories
public class IssueTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(IssueTrackerApplication.class, args);
	}

}
