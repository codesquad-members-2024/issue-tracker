package codesquad.issuetracker.user;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

@Table("USERS")
@Getter
@ToString
public class User implements Persistable<String> {

    @Id
    private String id;
    private String username;
    private String password;
    private Role role;
    private LocalDateTime createdAt;
    private boolean isDeleted;
    @Transient
    private boolean isNew = true;

    @Builder
    @PersistenceCreator
    User(String id, String username, String password, Role role, LocalDateTime createdAt,
        boolean isDeleted) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.isDeleted = isDeleted;
    }

    public static User from(String id, String username, String password, Role role) {
        User user = new User(id, username, password, role, LocalDateTime.now(), false);
        return user;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    public enum Role {
        USER, ADMIN,
    }

}
