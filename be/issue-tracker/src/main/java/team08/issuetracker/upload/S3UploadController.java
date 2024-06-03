package team08.issuetracker.upload;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@Slf4j
public class S3UploadController {
    private final S3UploadService s3UploadService;

    @PostMapping
    public ResponseEntity<UploadResponse> create(
            @RequestPart(value = "uploadImg", required = false) MultipartFile multipartFile) {

        String fileUrl = "";
        if (multipartFile != null) { // 파일 업로드한 경우에만

            try {// 파일 업로드
                fileUrl = s3UploadService.upload(multipartFile, "images"); // S3 버킷의 images 디렉토리 안에 저장됨
                log.info("Img Uploaded! {}", fileUrl);
            } catch (IOException e) {
                return ResponseEntity.ok(new UploadResponse("upload Failed"));
            }
        }
        UploadResponse response = new UploadResponse(fileUrl);
        return ResponseEntity.ok(response);
    }
}
