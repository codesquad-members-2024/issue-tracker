package com.codesquad.team3.issuetracker.support.iterator;

import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import com.codesquad.team3.issuetracker.support.enums.SoftDeleteSearchFlags;

import java.util.Iterator;

public class SoftDeleteTableIterator<T extends SoftDeleteEntity> implements Iterator<T> {

    private final Iterator<T> roughIterator;
    private T next = null;
    private final SoftDeleteSearchFlags skipCondition;

    public SoftDeleteTableIterator(Iterator<T> roughIterator, SoftDeleteSearchFlags flags) {
        this.roughIterator = roughIterator;
        this.skipCondition = flags;
        next();
    }

    @Override
    public boolean hasNext() {
        return next != null;
    }

    @Override
    public T next() {
        T now = next;

        next = null;
        while (this.roughIterator.hasNext() && next == null) {
            next = this.roughIterator.next();
            if (next.isDeleted()) {
                if (skipCondition.equals(SoftDeleteSearchFlags.DELETED)) {
                    next = null;
                }
            } else {
                if (skipCondition.equals(SoftDeleteSearchFlags.NOT_DELETED)) {
                    next = null;
                }
            }
        }

        return now;
    }
}
