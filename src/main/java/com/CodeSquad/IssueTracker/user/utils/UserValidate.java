package com.CodeSquad.IssueTracker.user.utils;

// 사용자 정보 검증을 위한 별도의 유틸리티 클래스
public class UserValidate {

    public static boolean isUserIdValid(String userId) {
        return isLengthValid(userId, 6, 16) && userId.matches("[a-zA-Z0-9]+");
    }

    public static boolean isUserPasswordValid(String userPassword) {
        return isLengthValid(userPassword, 6, 12);
    }

    public static boolean isUserNicknameValid(String userNickname) {
        return isLengthValid(userNickname, 2, 6);
    }

    private static boolean isLengthValid(String field, int min, int max) {
        return field != null && field.length() >= min && field.length() <= max;
    }
}
