import * as S from "./popupStyle";
import { styled } from "styled-components";
import { Label } from "../../Model/types";

interface LabelPopupProps {
  labelList: Label[];
  selectedLabel: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLabelNone: boolean;
}

export default function LabelPopup({
  labelList,
  selectedLabel,
  onChange,
  isLabelNone,
}: LabelPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>레이블 설정</S.DropdownHeader>
      {isLabelNone && (
        <S.DropdownOption>
          <S.OptionInfo>
            <span>라벨이 없는 이슈</span>
          </S.OptionInfo>
          <input
            type="radio"
            id={"none"}
            name="label"
            value={"none"}
            checked={selectedLabel.includes("none")}
            onChange={onChange}
          />
        </S.DropdownOption>
      )}
      {labelList.map((item) => {
        const { id, name, background_color } = item;
        return (
          <S.DropdownOption key={`labelPopupOtion-${name}`}>
            <S.OptionInfo>
              <LabelColorCircle color={background_color} />
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type="radio"
              id={name}
              name="label"
              value={id.toString()}
              checked={selectedLabel.includes(name)}
              onChange={onChange}
            />
          </S.DropdownOption>
        );
      })}
    </S.DropdownPanel>
  );
}

const LabelColorCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 8px;
`;
