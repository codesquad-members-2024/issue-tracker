package team08.issuetracker.upload;

import lombok.Getter;

@Getter
public class UploadResponse {
    private final String uploadedUrl;

    public UploadResponse(String uploadedUrl) {
        this.uploadedUrl = uploadedUrl;
    }
}
