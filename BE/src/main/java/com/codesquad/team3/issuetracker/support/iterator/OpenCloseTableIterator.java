package com.codesquad.team3.issuetracker.support.iterator;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;
import com.codesquad.team3.issuetracker.support.enums.OpenCloseSearchFlags;

import java.util.Iterator;

public class OpenCloseTableIterator<T extends OpenCloseEntity> implements Iterator<T> {

    private final Iterator<T> roughIterator;
    private T next;
    private final OpenCloseSearchFlags skipCondition;

    public OpenCloseTableIterator(Iterator<T> roughIterator, OpenCloseSearchFlags flags) {
        this.roughIterator = roughIterator;
        skipCondition = flags;
        next();
    }

    @Override
    public boolean hasNext() {
        return this.next != null;
    }

    @Override
    public T next() {
        T now = this.next;

        this.next = null;
        while (this.roughIterator.hasNext() && this.next == null) {
            this.next = roughIterator.next();
            if (this.next.isClosed()) {
                if (skipCondition.equals(OpenCloseSearchFlags.CLOSE)) {
                    this.next = null;
                }
            }else {
                if (skipCondition.equals(OpenCloseSearchFlags.OPEN)) {
                    this.next = null;
                }
            }
        }

        return now;
    }
}
