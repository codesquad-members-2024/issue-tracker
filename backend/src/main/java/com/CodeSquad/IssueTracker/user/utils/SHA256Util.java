package com.CodeSquad.IssueTracker.user.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class SHA256Util {

    private static final int SALT_LEN = 16;
    private static final String ENCRYPT_ALGORITHM = "SHA-256";

    public static String encrypt(String password, byte[] salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance(ENCRYPT_ALGORITHM);
            digest.update(salt);
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(ENCRYPT_ALGORITHM + "암호화 방식을 찾을 수 없습니다.");
        }
    }

    public static byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_LEN];
        random.nextBytes(salt);
        return salt;
    }

    public static String getSaltedHash(String password) {
        byte[] salt = generateSalt();
        String hash = encrypt(password, salt);
        return Base64.getEncoder().encodeToString(salt) + ":" + hash;
    }

    public static boolean verify(String password, String saltedHash) {
        String[] split = saltedHash.split(":");
        byte[] salt = Base64.getDecoder().decode(split[0]);
        String hash = encrypt(password, salt);
        return hash.equals(split[1]);
    }

    public static void main(String[] args) {
        String password = "qqwweerr";
        String saltedHash = getSaltedHash(password);
        System.out.println(saltedHash);
        System.out.println(verify(password, saltedHash));
        System.out.println(verify("qwerqwer", saltedHash));
        System.out.println(verify("1234", saltedHash));
    }
}
