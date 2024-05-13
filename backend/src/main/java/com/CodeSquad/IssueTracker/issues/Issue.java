package com.CodeSquad.IssueTracker.issues;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "issues")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issue_id")
    private Long id;

    @Column(nullable = false, length = 60)
    private String title;

    @Column(length = 16)
    private String author;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "is_closed")
    private Boolean isClosed;

    protected Issue() {}


    public Issue(String title, String author) {
        this.title = title;
        this.author = author;
        this.publishedAt = LocalDateTime.now();
        this.isClosed = false;
    }

}
