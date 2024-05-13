package com.codesquad.team3.issuetracker.global.entity.callbacks;

import com.codesquad.team3.issuetracker.global.entity.NonAutoGenerateIdEntity;
import org.springframework.data.relational.core.mapping.event.AfterSaveCallback;
import org.springframework.stereotype.Component;

@Component
public class NonAutoGenerateIdEntityCallback implements AfterSaveCallback<NonAutoGenerateIdEntity> {


    @Override
    public NonAutoGenerateIdEntity onAfterSave(NonAutoGenerateIdEntity aggregate) {
        if (aggregate.isNew()) aggregate.setUpdate();

        return aggregate;
    }
}
