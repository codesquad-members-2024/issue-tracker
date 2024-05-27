package com.codesquad.team3.issuetracker.global.entity;


public interface SoftDeleteEntity {

     void delete();
     void recover();
}
