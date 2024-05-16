import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '~/common/components/Button';
export function ImageUpload() {
	const [imageFile, setImageFile] = useState(null);
	const [imgSrc, setImageSrc] = useState(null);
	const inputRef = useRef([]);

	const handleFileChange = async e => {
		const file = e.target.files[0];
		const fileExt = file.name.split('.').pop();

		// 확장자 검사
		if (!['jpeg', 'jpg', 'png', 'gif'].includes(fileExt)) {
			// TODO: alert 대신 에러 메시지를 띄워주세요.
			alert('이미지 파일만 업로드 가능합니다.');
			return;
		}

		// 파일 리더 객체 생성
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = e => {
			setImageFile(file);
			setImageSrc(e.target.result);
		};

		reader.onerror = () => {
			// TODO: alert 대신 에러 메시지를 띄워주세요.
			alert('파일을 읽는 중 오류가 발생했습니다.');
		};
	};

	const handleUpload = async () => {
		if (!imageFile) return;

		try {
			const result = await Storage.put(imageFile.name, imageFile, {
				contentType: imageFile.type,
			});
			console.log('File uploaded successfully:', result);
			alert('File uploaded successfully');
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Error uploading file');
		}
	};

	return (
		<StyledWrapper>
			<StyledInputFile
				multiple
				accept='image/*'
				type='file'
				ref={el => (inputRef.current[0] = el)}
				onChange={handleFileChange}
			/>
			{imgSrc && <StyledImage src={imgSrc} alt='Selected Image' />}

			<Button
				type='button'
				size='small'
				buttonType='ghost'
				buttonText='업로드하기'
				onClick={handleUpload}
			/>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	padding: 0;
`;

const StyledInputFile = styled.input``;

const StyledImage = styled.img`
	margin-top: 10px;
	max-width: 100%;
	height: auto;
`;
